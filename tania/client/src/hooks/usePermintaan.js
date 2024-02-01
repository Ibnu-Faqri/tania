import { useEffect, useState } from "react";

function usePermintaan() {
  const [listPermintaan, setPermintaan] = useState([])
  const token = localStorage.getItem("token")

  async function fetchPermintaan() {
    const respons = await fetch("http://localhost:5000/ajuan", {
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
  return listPermintaan
}

export default usePermintaan