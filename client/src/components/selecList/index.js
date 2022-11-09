import React, { Component }  from 'react';
import { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';

const SelectList = ({title, url, handleChange}) => {

    const {data, error, loading} = useFetch(url);
    
    if(!data) return null;
    
    let id = `select= ${title}`
    
    console.log(data)
    
    


    return (
        <div>
             <label htmlFor={id}>{title}</label>
            <select name={id} id={id} onChange= {handleChange}> 
                <option value="">
                    ----Elige un {title}-----
                </option>
                {data[0].password && !data[0].id && data.map((el) => <option value={el.password}>{el.name } </option>    )}
                {!data[0].id && !data[0].password && data.map((el) => <option value={  el.day_of_week}>{el.day_of_week } </option>    )}    
                {data[0].id && !data[0].password && data.map((el) => <option value={  el.hour}>{el.hour } </option>    )}    
                
             </select> 
        </div>
    );
};

export default SelectList;