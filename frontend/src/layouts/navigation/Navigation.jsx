import React, { useRef } from "react";
import './navigation.css'
import { Link } from 'react-router-dom'


const Navigation = () => {

  const checkRef = useRef(null)

  // const isChecked = (e) => {
  //   console.log(e.target)
  //   const checkedorNot = checkRef.current.checked;
  // }

  const handleClose=()=>{
    checkRef.current.checked=false
  }

  return (
    <nav className="navigation">
      <input
        type="checkbox"
        name=""
        ref={checkRef}
        className="navigation__checkbox"
        id="navi-toggle"
        // onChange={(e) => isChecked(e)}
      />

      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>

      <nav className="navigation__nav">
        <ul className="navigation__list"
          onClick={() => handleClose()}
        >
          <li className="navigation__item">
            <Link to="search" className="navigation__link">
              <span>01</span>Search{" "}
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="products" className="navigation__link">
              <span>01</span>Products{" "}
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/login" className="navigation__link">
              <span>03</span>Account
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="LOL" className="navigation__link">
              {" "}
              <span>04</span>About{" "}
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/login" className="navigation__link">
              {" "}
              <span>05</span>Support{" "}
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/" className="navigation__link">
              {" "}
              <span>06</span>Home{" "}
            </Link>
          </li>
        </ul>
      </nav>
    </nav>
  );
};

export default Navigation;
