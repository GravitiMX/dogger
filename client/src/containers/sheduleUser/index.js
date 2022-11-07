import React, { useEffect, useState } from "react";
import { Container } from "./styled";
import Cookies from "universal-cookie"

const API_URL = 'http://127.0.0.1:8000/api/v1/dogs3/';

export const listdogs = async() =>{
    let api = API_URL.concat(cookies.get('password'))
    console.log("Esto es la api")
    console.log(api)
    return await fetch(api)
}

const cookies = new Cookies();

const ScheduleUser = () => {
    const [listDog, setListDog] = useState();



    const listD = async() => {
        try {
            const res = await listdogs();
            const data = await res.json();
            console.log(data)
            setListDog(data)

        } catch (error) {
            console.log(error   )
        }
    }
    
    useEffect(() =>{
        listD();
    }, []); 

    return (
        
        
        <Container>
            <div>
                
                  
                    
                    { listDog?.map((c) => (
                        <button name = {c.id}>
                            {c.breed}
                        </button>
                      ))};
                    
                  
                    
                
                Aqui esta el ScheduleUser
            </div>
        </Container>
    );
}





export default ScheduleUser;