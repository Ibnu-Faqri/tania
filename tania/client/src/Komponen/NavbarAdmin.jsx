import React from 'react'
import styles from "./Navbar.module.scss"
import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom';

export default function NavbarAdmin() {
  return (
    <div className={styles.navbar}>
      <img src="taspen.png" alt="" />
      <Link to="/">Dashboard</Link>
      <Link to="/permintaan">Daftar Permintaan</Link>
    </div>
  )
}
