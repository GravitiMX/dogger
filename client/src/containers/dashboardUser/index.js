import React, { useEffect, useState } from "react";
import ScheduleUser from "../sheduleUser";
import { Container } from "./styled";
import Cookies from "universal-cookie"
const cookies = new Cookies();

const API_URL = 'http://127.0.0.1:8000/api/v1/scheduled-walks-for-walker/';

export const listdogs = async() =>{
    let api = API_URL.concat(cookies.get('email'))
    api = api.concat("/")
    return await fetch(api)
}

const DashboardUser = () => {
    const [listDog, setListDog] = useState();
    const listD = async() => {
        try {
            const resu = await listdogs();
            const datau = await resu.json();
           
            setListDog(datau)

        } catch (error) {

        }
    }
    
    useEffect(() =>{
        listD();
    }, []); 



    const registrarPerro = () => {
        window.location.href = '/registrarPerro'
    }
    const agendarPaseador = () => {
        window.location.href = '/agendarPaseador'
    }


    return (
        
        <Container>
            
            <button onClick={registrarPerro}>
              Registrar un Perro  
            </button>
            
            <h2>
                Mis perros registrados
            </h2>
            <ul>
            
            <ScheduleUser>
            </ScheduleUser>
                
            </ul>

            <button onClick={agendarPaseador}>
              Registrar un Paseo  
            </button>
            <div>
                <h2>
                    Mis paseos registrados
                </h2>
                    { listDog?.map((c) => (
                        <button name = {c.id}>
                            {c.name}
                        </button>
                      ))}

            
            </div>
             
        </Container>
    );
}

export default DashboardUser;