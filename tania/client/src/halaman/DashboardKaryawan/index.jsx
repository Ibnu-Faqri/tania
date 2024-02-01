import React from 'react'
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import styles from "./styles.module.scss"
import { MdOutlineWorkHistory } from "react-icons/md";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";
export default function DashboardKaryawan() {
  return (
    <div className={styles.dashboard}>
      <h1>DASHBOARD</h1>
      <hr />
      <h1 className={styles.selamat}>Selamat Datang,</h1>
      <h2>KARYAWAN PT TASPEN (Persero) KC LHOKSEUMAWE</h2>
      <div className={styles.list}>
        {/* Permintaan */}
        <div className={styles.navigasi}>
          <div>
            <VscGitPullRequestGoToChanges color='#094A7B'/>
            <p>Permintaan</p>
          </div>
          <div>
            <Link to="/tambah">view details</Link >
            <IoIosArrowDroprightCircle color='41868A'/>
          </div>
        </div>

        {/* Riwayat */}
        <div className={styles.navigasi} style={{ backgroundColor: '#E6C12033' }}>
          <div>
            <MdOutlineWorkHistory color='#D2AF2B'/>
            <p>Riwayat</p>
          </div>
          <div>
            <Link to="/riwayat">view details</Link>
            <IoIosArrowDroprightCircle color='#E6C120'/>
          </div>
        </div>
      </div>
    </div>
  )

}
