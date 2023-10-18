import React from "react";
import styles from "@/styles/components/app-cover.module.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useSearch } from "@/hooks/useSearch";
import { searchBarStyling } from "./Navbar";
import { useState } from "react";

export default function AppCover({ children }) {
  const [data, setData] = useState([]);

  const {
    handleOnSearch,
    handleOnHover,
    handleOnFocus,
    handleOnSelect,
    formatResult,
  } = useSearch(data, setData);

  return (
    <div className={styles.appCover}>
      <div className={styles.searchBar}>
        {/* Main Menu */}
        <div
          style={{
            width: "100%",
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
            styling={searchBarStyling}
            placeholder="Images, #tags, @users oh my!"
          />
        </div>
        {/* Main Menu End*/}
      </div>
      {children}
    </div>
  );
}
