import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./search.css"

const Search = () => {
    const[keyword,setKeyword]=useState("");
    const navigate=useNavigate();

    const searchSubmitHandler =(e)=>{
        e.preventDefault();
        if(keyword.trim()){
         navigate(`/products/${keyword}`)
        }
        else{
            navigate("/products")
        }
    }

  return (
    <>
    <form className='searchBar' onSubmit={searchSubmitHandler}>
      <input type="text" placeholder='Search a product...' onChange={(e)=>setKeyword(e.target.value)}></input>
      <input type="submit" value="Search"></input>
        </form>
    </>
  )
}

export default Search