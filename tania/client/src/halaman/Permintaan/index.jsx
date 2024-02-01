import React, { useRef } from 'react'
import styles from "./styles.module.scss"
import { useNavigate } from "react-router-dom";

export default function Permintaan() {
  const jenisRef = useRef()
  const jlhRef = useRef()
  const token = localStorage.getItem('token')
  const navigasi = useNavigate()
  const submitPengajuan = async () =>{
    const respons = await fetch('http://localhost:5000/ajuan' , {
      method : 'post' , 
      headers : {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      },
      body : JSON.stringify({
        jenis_barang: jenisRef.current.value,
        jumlah_permintaan: jlhRef.current.value,
      })
    })
    if (respons.status === 201) {
      navigasi('/riwayat')
    }
  }
  return (
    <div className={styles.permintaan}>
      <h1>Permintaan Baru</h1>
      <div>
        <label htmlFor="jenis">Jenis Barang :</label>
        <input type="text" id='jenis' name='jenis' ref={jenisRef} />
        <label htmlFor="jumlah">Jumlah Permintaan :</label>
        <input type="number" id='jumlah' name='jumlah' ref={jlhRef} />
        <button onClick={submitPengajuan}>
          Send
        </button>
      </div> 
    </div>
  )
}
