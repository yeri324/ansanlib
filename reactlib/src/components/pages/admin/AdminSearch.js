import React, { useState,useEffect } from "react";



const AdminSearch = (searchOption, setSearchOption, onSearch)=>{

	const handleOnChange = (e)=>{
		const {name,value} =e.target;
		setSearchOption((prevState) => {
			return { ...prevState,
				[name]: value,
			}});
	};
  
    return (
        <div>
            
		        <select name="searchBy" value={searchOption.searchBy} onChange={handleOnChange}>
		            <option value="userId">ID</option>
		            <option value="userName">Name</option>
		        </select>

		        <input type="text" name="searchQuery" value={searchOption.searchQuery} onChange={handleOnChange}/>

				<input type="radio" name="selectRadio" value="all" checked={searchOption.selectRadio==="all"} onChange={handleOnChange}/>
				<input type="radio" name="selectRadio" value="penalty" checked={searchOption.selectRadio==="penalty"} onChange={handleOnChange}/>
				<input type="radio" name="selectRadio" value="latefee" checked={searchOption.selectRadio==="latefee"} onChange={handleOnChange}/>
		        

		        <button onClick={onSearch}>Search</button>
        </div>
    );
    }
    export default AdminSearch;