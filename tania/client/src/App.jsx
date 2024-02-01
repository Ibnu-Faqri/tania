import DashboardKaryawan from "./halaman/DashboardKaryawan"
import Navbar from "./Komponen/Navbar"
import Header from "./Komponen/header"
import "./styles.scss"
import Login from "./halaman/Login"
import Riwayat from "./Riwayat"
import Permintaan from "./halaman/Permintaan"
import DashboardAdmin from "./halaman/DashboardAdmin"
import NavbarAdmin from "./Komponen/NavbarAdmin"
import DaftarPermintaan from "./halaman/DaftarPermintaan"
import DetailPermintaan from "./halaman/DetailPermintaan"
import { useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import DetailRiwayat from "./halaman/RiwayatPermintaan"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const isAdmin = (localStorage.getItem("isadmin") === "true")

  if (!token) return <Login setToken={setToken} />

  return (
    <Routes>
      <Route path="/" element={<Layout isAdmin={isAdmin} setToken={setToken} />}>
        <Route path="/" element={isAdmin ? <DashboardAdmin /> : <DashboardKaryawan />} />
        <Route path="/permintaan" element={<DaftarPermintaan />} />
        <Route path="/detail/:id" element={<DetailPermintaan />} />
        <Route path="/riwayat/:id" element={<DetailRiwayat />} />
        <Route path="/tambah" element={<Permintaan />} />
        <Route path="/riwayat" element={<Riwayat />} />
      </Route>
    </Routes>
  )
}

function Layout({ isAdmin, setToken }) {
  return (
    <>
      <Header setToken={setToken}/>
      {isAdmin ? <NavbarAdmin /> : <Navbar />}
      <div id="content">
        <Outlet />
      </div>
    </>
  )
}

export default App
