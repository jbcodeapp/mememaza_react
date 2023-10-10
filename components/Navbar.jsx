import React from "react";
import { useState } from "react";
import Link from "next/link";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import { useSearch } from "@/hooks/useSearch";

import styles from "@/styles/components/navbar.module.css";

export default function Navbar({ bgOpacity }) {
  const [data, setData] = useState([]);
  console.log(bgOpacity);
  const {
    handleOnSearch,
    handleOnHover,
    handleOnFocus,
    handleOnSelect,
    formatResult,
  } = useSearch(data, setData);
  return (
    <nav
      className={styles.navbar}
      style={{
        backgroundColor: `rgba(23 21 68 / ${bgOpacity})`,
      }}
    >
      <Link legacyBehavior href="/">
        <img
          src="assets/images/logos/logo.png"
          alt="Logo"
          title="Logo"
          height="100%"
        />
      </Link>
      <div
        className="nav-outer mx-auto clearfix"
        style={{ position: "relative", width: 550 }}
      >
        {/* Main Menu */}
        <div
          style={{
            width: 550,
            position: "absolute",
            left: 0,
            zIndex: 20,
          }}
        >
          <ReactSearchAutocomplete
            items={data}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            resultStringKeyName="title"
            autoFocus
            //fuseOptions={{ keys: ["title", "description"] }}
            formatResult={formatResult}
            styling={{
              backgroundColor: "rgba(255,255,255,.25) !important",
              border: "1px solid transparent",
              padding: "8px 35px 8px 10px",
              borderRadius: "3px",
              width: "100%",
              zIndex: 20,
              outline: 0,
              opacity: 0.8,
              height: 45,
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: 0.4,
              color: "#fff",
              textShadow: "inherit",
              iconColor: "#fff",
              placeholderColor: "#8b8aa2",
              searchIconMargin: "8px",
            }}
            placeholder="Images, #tags, @users oh my!"
          />
        </div>
        {/* Main Menu End*/}
      </div>

      <div className="menu-btns">
        <Link legacyBehavior href="">
          <a className="theme-btn1" onClick={() => signin()}>
            Sign in
          </a>
        </Link>
        <Link legacyBehavior href="">
          <a className="theme-btn1" onClick={() => signup()}>
            Sign Up
          </a>
        </Link>
      </div>
    </nav>
  );
}
