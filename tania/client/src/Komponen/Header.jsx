import React from 'react'
import style from "./Header.module.scss"
import { TbLogout } from "react-icons/tb";
import { Link } from 'react-router-dom';

export default function Header({ setToken }) {
  const logout = () => {
    localStorage.setItem("token", "")
    localStorage.setItem("role", "")
    setToken("")
  }
  
  return (
    <div className={style.header}>
      <Link to="/" onClick={logout}>
        Logout
        <TbLogout color='black' />
      </Link>
    </div>
  )
}
