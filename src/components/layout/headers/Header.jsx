import React from "react";
// import { HeaderExplore } from "../component/header-explore";

import SearchToggle from "../component/SearchToggle";
// import CartToggle from "../component/CartToggle";
import Menu from "../component/Menu";
import { Link } from "react-router-dom";

import { useState } from "react";
import MobileMenu from "../component/MobileMenu";
import { useContextElement } from "@/context/Context";

export default function Header() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const { appLogo } = useContextElement();

  return (
    <>
      <header className="header -type-1 ">
        <div className="header__container">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="header-left">
                <div className="header__logo">
                  <Link to="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>
                    <img src={appLogo} alt="logo" style={{ height: "40px", width: "auto", maxWidth: "130px" }} />
                    <span style={{ fontSize: "10px", fontWeight: 600, color: "#00e5a0", letterSpacing: "0.5px", marginTop: "2px", lineHeight: 1 }}>✦ AI Powered</span>
                  </Link>
                </div>

                {/* header explore start */}
                {/* <HeaderExplore
                  allClasses={
                    "header__explore text-green-1 ml-60 xl:ml-30 xl:d-none"
                  }
                /> */}
                {/* header explore end */}
              </div>
            </div>

            <Menu allClasses={"menu__nav text-white -is-active"} />
            <MobileMenu
              setActiveMobileMenu={setActiveMobileMenu}
              activeMobileMenu={activeMobileMenu}
            />

            <div className="col-auto">
              <div className="header-right d-flex items-center">

                {/* Contact Icon Buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginRight: "20px" }}>
                  <a
                    href="tel:8878868600"
                    title="Call us: 8878868600"
                    style={{ color: "#fff", fontSize: "18px", lineHeight: 1, textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#22C55E"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}
                  >
                    <i className="fa fa-phone" />
                  </a>
                  <a
                    href="mailto:edunoble.learning@gmail.com"
                    title="Email: edunoble.learning@gmail.com"
                    style={{ color: "#fff", fontSize: "18px", lineHeight: 1, textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#22C55E"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}
                  >
                    <i className="fa fa-envelope" />
                  </a>
                </div>

                <div className="header-right__icons text-white d-flex items-center">
                  {/* search toggle start */}
                  <SearchToggle />
                  {/* search toggle end */}

                  {/* cart toggle start */}
                  {/* <CartToggle
                    parentClassess={"relative ml-30 xl:ml-20"}
                    allClasses={"d-flex items-center text-white"}
                  /> */}
                  {/* cart toggle end */}

                  <div className="d-none xl:d-block ml-20">
                    <button
                      onClick={() => setActiveMobileMenu(true)}
                      className="text-white items-center"
                      data-el-toggle=".js-mobile-menu-toggle"
                    >
                      <i className="text-11 icon icon-mobile-menu"></i>
                    </button>
                  </div>
                </div>

                {/* <div className="header-right__buttons d-flex items-center ml-30 md:d-none">
                  <Link to="/login" className="button -underline text-white">
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="button -sm -white text-dark-1 ml-30"
                  >
                    Sign up
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
