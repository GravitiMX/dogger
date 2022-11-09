import React, {useState, useEffect} from "react";
import { Container } from "./styled";
import Cookies from "universal-cookie";


const API_URL_SCHEDULE = 'http://127.0.0.1:8000/api/v1/schedule3/';
const API_URL_DOGSIZE = 'http://127.0.0.1:8000/api/v1/dogSizeForWalker/';

export const listSchedules = async() =>{
    let api = API_URL_SCHEDULE.concat(cookies.get('email'))
    api = api.concat("/")
    return await fetch(api)
}
export const listDogSize = async() =>{
    let apid = API_URL_DOGSIZE.concat(cookies.get('email'))
    apid = apid.concat("/")
    return await fetch(apid)
}

const cookies = new Cookies();

const DashboardWalker = () => {
    const [listSchedule, setListSchedule] = useState([]);
    const [listDogSizes, setListDogSizes] = useState([]);


    const registrarHorario = () => {
        window.location.href = '/registrarSchedule'
    }
    
    const registerSize = () => {
        window.location.href = '/registerSize'
    }
    
    const listDog = async() => {
        try {
            const res1 = await listDogSize();
            console.log(res1)
            const datas = await res1.json();
            console.log(datas)
            setListDogSizes(datas)
            console.log("la lista"+listDogSizes)
        } catch (error) {
            console.log(error   )
        }
    }
    const listW = async() => {
        try {
            const res = await listSchedules();
            
            const data = await res.json();
            console.log(data)
            setListSchedule(data)
            console.log("la lista"+listSchedule)
        } catch (error) {
            console.log(error   )
        }
    }

    
    
    useEffect(() =>{
        listW();
        listDog();
    }, []); 


    return (
        <Container>
            <button onClick={registrarHorario}>
              Registrar un Horario 
            </button>


            <div>

            <h2>
                Mis horarios
            </h2>

            { listSchedule?.map((c) => (
                        <>
                        <ul>
                            <button name = {c.id}>
                            {c.day_of_week}, {c.hour}
                        </button> 
                        </ul>                    
                        </>
                      ))}
            </div>


            <button onClick={registerSize}>
                Registrar un tamano de perro    
            </button>

            <div>

            <h2>
                Mis tamanos elegidos
            </h2>

            { listDogSizes?.map((c) => (
                        <>
                        <ul>
                            <button name = {c.id}>
                            {c.size}
                        </button> 
                        </ul>                    
                        </>
                      ))}
            </div>
        
             
        </Container>
    );
}

export default DashboardWalker;