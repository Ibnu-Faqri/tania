import React, { useRef } from 'react'
import styles from "./styles.module.scss"
import usePermintaanById from '../../hooks/usePermintaanById'
import { useNavigate, useParams } from 'react-router-dom'

export default function DetailPermintaan() {
  const { id } = useParams()
  const permintaan = usePermintaanById(id)
  const jlhRef = useRef()
  const keteranganRef = useRef()
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const approve = () => {
    submit(true)
  }
  const tolak = () => {
    submit(false)
  }

  const submit = async (approve) => {
    const jumlah = jlhRef.current.value === "" ? permintaan.jumlah_permintaan : jlhRef.current.value
    const response = await fetch(`http://localhost:5000/ajuan/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jumlah_dikeluarkan: approve ? jumlah : 0,
        keterangan: keteranganRef.current.value,
        status: approve ? "Dikirim" : "Ditolak"
      })
    })

    if (response.status === 200) {
      navigate("/permintaan")
    }
  }
  
  return (
    <div className={styles.detail}>
      <div className={styles.nama}>
        <h1>
          DAFTAR PERMINTAAN BARANG 
        </h1>
      </div>
      <table className={styles.penghasilan}>
        <thead>
          <tr>
            <td>
              NO
            </td>
            <td>
              JENIS BARANG
            </td>
            <td>
              JUMLAH PERMINTAAN
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{permintaan.jenis_barang}</td>
            <td>{permintaan.jumlah_permintaan}</td>
          </tr>
        </tbody>
      </table>
        <label htmlFor="jlh-keluar">Jumlah yang Dikeluarkan : </label>
        <input type="number" id='jlh-keluar' name='jlh-keluar' min="0" ref={jlhRef} />
        <br />
        <textarea name="keterangan" id="keterangan" placeholder='Keterangan' ref={keteranganRef}></textarea>
        <div>
          <button onClick={approve}>
            Approve
          </button>
          <button onClick={tolak}>
            Tolak
          </button>
        </div>
    </div> 
  )
}
