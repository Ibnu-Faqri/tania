import React from "react"
import styles from "./styles.module.scss"
import usePermintaan from "../hooks/usePermintaan"
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Riwayat() {
  const listPengajuan = usePermintaan()
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const terimaBarang = async (id) => {
    const response = await fetch(`http://localhost:5000/ajuan/${id}/balas`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (response.status === 200) {
      navigate("/riwayat")
    }
  }

  return (
    <div className={styles.riwayat}>
      <table>
        <thead>
          <tr>
            <td>NO</td>
            <td>JENIS BARANG</td>
            <td>Jumlah Permintaan</td>
            <td>Jumlah yang Dikeluarkan</td>
            <td>Keterangan</td>
            <td>Status</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          {listPengajuan.map((pengajuan, index) => {
            const key = crypto.randomUUID()
            return (
              <tr key={key}>
                <td>{index + 1}</td>
                <td>{pengajuan.jenis_barang}</td>
                <td>{pengajuan.jumlah_permintaan}</td>
                <td>
                  {pengajuan.status == "Pending"
                    ? "-"
                    : pengajuan.jumlah_dikeluarkan}
                </td>
                <td>{pengajuan.keterangan}</td>
                <td><Link to={`/riwayat/${pengajuan.id}`}>
                <FaEdit />
                  </Link></td>
                {pengajuan.status === "Dikirim" ? (
                  <td>
                    <button onClick={() => terimaBarang(pengajuan.id)}>Diterima</button>
                  </td>
                ) : <td></td>}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
