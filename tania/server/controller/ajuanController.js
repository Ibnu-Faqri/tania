const { User, Ajuan, sequelize } = require("../models");
const ajuan = require("../models/ajuan");

class Controller {
    static getAjuan(req, res) {
        Ajuan.findAll({ 
            include:[
                { model: User, attributes: ['name', 'email']}
            ]
        })
        .then((ajuan) => {
            res.status(200).json(ajuan);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
    }

    static async getAjuanId(req, res) {
        const { id } = req.params;
        console.log(id)
       
        try  {
            if (!await Ajuan.findByPk(id)) {
            return res.status(404).json({ message: "Ajuan tidak dapat ditemukan" });
            }           
              res.status(200).json(await Ajuan.findByPk(id));
            } catch (error) {
              res.status(500).json({ error: "Internal Server Error" });
            };
    }


    static async createAjuan(req, res) {
        const { jenis_barang, jumlah_permintaan } = req.body;
        Ajuan.create({
            userId: req.userId,
            jenis_barang,
            jumlah_permintaan,
            jumlah_dikeluarkan: "0",
            keterangan: "Menunggu permintaan",
        }).then((ajuans) => {
            res.status(201).json(ajuans);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }

    static async updateAjuan (req, res) {
      const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { jenis_barang, jumlah_permintaan } = req.body;
        await Ajuan.update(
        {
          jenis_barang, jumlah_permintaan
        },
        {
            where: {
                id: id
            }
        }
      );
      const ajuans = await Ajuan.findByPk(id);
      if (!ajuans) {
          return res.status(404).json({ message: "Ajuan tidak ditemukan" });
      }
      res.status(200).json(ajuans
          );
    } catch (error) {
      console.error("Error in updateReservasiStatus:", error);
      // Rollback transaksi jika terjadi kesalahan
      await t.rollback();
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
    }

    static async balasAjuan(req, res) {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { jumlah_dikeluarkan, keterangan, status } = req.body;
        await Ajuan.update(
        {
          jumlah_dikeluarkan, keterangan, status
        },
        {
            where: {
                id: id
            }
        }
      );
      const ajuans = await Ajuan.findByPk(id);
      if (!ajuans) {
          return res.status(404).json({ message: "Ajuan tidak ditemukan" });
      }
      res.status(200).json(ajuans
          );
    } catch (error) {
      console.error("Error in updateReservasiStatus:", error);
      // Rollback transaksi jika terjadi kesalahan
      await t.rollback();
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  }

  static async balasAjuanAdmin(req, res) {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        await Ajuan.update(
        {
          status: "Diterima"
        },
        {
            where: {
                id: id
            }
        }
      );
      const ajuans = await Ajuan.findByPk(id);
      if (!ajuans) {
          return res.status(404).json({ message: "Ajuan tidak ditemukan" });
      }
      res.status(200).json(ajuans
          );
    } catch (error) {
      console.error("Error in updateReservasiStatus:", error);
      // Rollback transaksi jika terjadi kesalahan
      await t.rollback();
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  }

  static async deleteReservasi(req, res) {
    const t = await sequelize.transaction(); // Mulai transaksi
    try {
      const { id } = req.params;
      // Cari reservasi berdasarkan ID
      const reservasi = await Reservasi.findByPk(id);
      if (!reservasi) {
        return res.status(404).json({ message: "Reservasi tidak ditemukan" });
      }
      // Hapus reservasi dalam transaksi
      await reservasi.destroy({ transaction: t });
      // Commit transaksi jika berhasil
      await t.commit();
      res.status(200).json({ message: "Reservasi berhasil dihapus" });
    } catch (error) {
      console.error("Error in deleteReservasi:", error);
      // Rollback transaksi jika terjadi kesalahan
      await t.rollback();
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  }
}

module.exports = Controller;