import React, { useRef, useState, useEffect } from 'react';
import styles from "./styles.module.scss";
import { FaEdit } from 'react-icons/fa';
// import usePermintaanById from '../../hooks/usePermintaanById';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetailRiwayat() {
  const { id } = useParams();
  const [jenisBarang, setJenisBarang] = useState("");
  const [jumlahPermintaan, setJumlahPermintaan] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data ajuan berdasarkan ID saat komponen dipasang
    const fetchAjuanData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/ajuan/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setJenisBarang(data.jenis_barang);
          setJumlahPermintaan(data.jumlah_permintaan);
        } else {
          // Handle error response if needed
          console.error("Failed to fetch ajuan data:", response.statusText);
        }
      } catch (error) {
        console.error("Error in fetchAjuanData:", error);
        // Handle any other errors that may occur
      }
    };

    fetchAjuanData();
  }, [id, token]);

  const updateJenisBarang = (event) => {
    setJenisBarang(event.target.value);
  };

  const updateJumlahPermintaan = (event) => {
    setJumlahPermintaan(event.target.value);
  };

  const approve = () => {
    submit(true);
  };

  const batal = () => {
    navigate("/riwayat");
  };

  const submit = async (approve) => {
    try {
      const response = await fetch(`http://localhost:5000/ajuan/${id}/edit`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jenis_barang: jenisBarang,
          jumlah_permintaan: jumlahPermintaan,
        }),
      });

      if (response.status === 200) {
        navigate("/riwayat");
      } else {
        // Handle error response if needed
        console.error("Failed to update ajuan:", response.statusText);
      }
    } catch (error) {
      console.error("Error in submit:", error);
      // Handle any other errors that may occur
    }
  };

  return (
    <div className={styles.detail}>
      <div className={styles.nama}>
        <h1>DAFTAR PERMINTAAN BARANG </h1>
      </div>
      <table className={styles.penghasilan}>
        <thead>
          <tr>
            <td>NO</td>
            <td>JENIS BARANG</td>
            <td>JUMLAH PERMINTAAN</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <input
                type="text"
                value={jenisBarang}
                onChange={updateJenisBarang}
              />
            </td>
            <td>
              <input
                type="number"
                value={jumlahPermintaan}
                onChange={updateJumlahPermintaan}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={approve}>submit</button>
        <button onClick={batal}>Kembali</button>
      </div>
    </div>
  );
}
