import React from 'react'
import { FaListCheck } from "react-icons/fa6";
import styles from "./styles.module.scss"
import { IoFileTrayStacked } from "react-icons/io5";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";

export default function DashboardAdmin() {
  return (
    <div className={styles.dashboard}>
      <h1>DASHBOARD</h1>
      <hr />
      <h1 className={styles.selamat}>Hi Admin, Welcome in Dashboard</h1>
      <div className={styles.list}>
        {/* Permintaan */}
        <div className={styles.navigasi}>
          <div>
            <FaListCheck color='#094A7B'/>
            <p>Daftar Permintaan</p>
          </div>
          <div>
            <Link to="/permintaan">view details</Link >
            <IoIosArrowDroprightCircle color='41868A'/>
          </div>
        </div>
      </div>
    </div>
  )

}
