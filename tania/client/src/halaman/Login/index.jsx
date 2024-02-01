import React, { useRef, useState } from 'react'
import styles from "./styles.module.scss"
export default function Login({ setToken }) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error , seterror] = useState('')
  const submitlogin = async () =>{
      seterror("")
      const respons = await fetch("http://localhost:5000/login", {
      method:"post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    })

    const data = await respons.json()
    if(respons.status === 200) {
      localStorage.setItem('token' , data.token)
      localStorage.setItem('isadmin' , data.isAdmin)
      setToken(data.token)
    } else {
      seterror(data.message ?? 'terjadi kesalahan')
    }
    
  }
  return (
    <div className={styles.login}>
      <h1>
        SISTEM INFORMASI DAFTAR PERMINTAAN BARANG <br /> ALAT TULIS KANTOR (ATK)
      </h1>
      <img src="taspen.png" alt="" className={styles.taspen} />
      <p>{error}</p>
      <div>
        <input type="text" placeholder='Email' ref={emailRef}/>
        <input type="password" placeholder='Password'ref={passwordRef} />
        <button onClick={submitlogin}>login</button>
      </div>
    </div>
  )
}
