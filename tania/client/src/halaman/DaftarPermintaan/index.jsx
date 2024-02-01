import React from "react"
import styles from "./styles.module.scss"
import usePermintaan from "../../hooks/usePermintaan"
import { Link } from "react-router-dom"

export default function DaftarPermintaan() {
  const listPengajuan = usePermintaan()

  return (
    <div className={styles.riwayat}>
      <table>
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis Barang</td>
            <td>Jumlah Permintaan</td>
            <td>Jumlah yang Dikeluarkan</td>
            <td>Aksi</td>
            <td>Status</td>
            <td>Keterangan</td>
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
                <td>
                  <Link to={`/detail/${pengajuan.id}`}>
                    Detail
                  </Link>
                </td>
                <td>{pengajuan.status}</td>
                <td>{pengajuan.keterangan}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
