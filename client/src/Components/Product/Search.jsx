import React, { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (name.trim()) {
      navigate(`/products?name=${name}`);
    } else {
      navigate(`/products`);
    }
    setName("");
  };

  return (
    <>
      <form className="searchBox" onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="Search Product ..."
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </>
  );
};

export default Search;
