const { Ajuan } = require("../models");

async function isUserOwnAjuan(req, res, next){
    const id = Number(req.params["id"]);
    try {
        const userId = req.userId;
        const params = req.params;
        const ajuanId = params.id;

        const ajuan = await Ajuan.findOne({where: { id: ajuanId,} });
          
        if (ajuan && ajuan.userId === userId) {
            next();
          } else if (!ajuan){
            throw new Error(`ID ${id} tidak ditemukan`);
          } else {
            throw new Error(`BUKAN MILIK ANDA!`)
          }
          
    } catch (error) {
        next(error);
    }
}

module.exports = isUserOwnAjuan;