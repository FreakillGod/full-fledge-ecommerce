import React, { useEffect } from 'react'
import './header.css'
import image from '../../assets/img/logo.png'

const Header = () => {

    useEffect(()=>{
        console.log(process.env.REACT_APP_API_URL)
    },[])
  return (
    <header className="header">
        <div className="header__logo-box">
            <img src={image} alt="logo" className="header__logo" />
        </div>
        <div className="header__text-box">
            <h1 className="heading-primary">
                <span className="heading-primary--main">YOU WISH</span>
                <span className="heading-primary--sub">WE GOT HERE</span>
            </h1>
            <a href="#Todays-deals" className="btn btn--white btn--animated">
                Todays deal
            </a>
        </div>
    </header>
  )
}

export default Header