import { useEffect, useState } from "react";

function usePermintaanById(id) {
  const [permintaan, setPermintaan] = useState({})
  const token = localStorage.getItem("token")

  async function fetchPermintaan() {
    const respons = await fetch(`http://localhost:5000/ajuan/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
    const data = await respons.json()
    setPermintaan(data)
  }

  useEffect(() => {
    fetchPermintaan()
  }, [])
  return permintaan
}

export default usePermintaanById