import React from 'react'
import styles from "./Navbar.module.scss"
import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <img src="taspen.png" alt="" />
      <Link to="/">Dashboard</Link>
      <Link to="/tambah">Permintaan</Link>
      <Link to="/riwayat">Riwayat</Link>
    </div>
  )
}
