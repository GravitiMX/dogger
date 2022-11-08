import React from "react";
import ScheduleUser from "../sheduleUser";
import { Container } from "./styled";



const DashboardUser = () => {
    
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

            <button onClick={agendarPaseador}>
              Registrar un Paseo  
            </button>
            

            <ScheduleUser>
            </ScheduleUser>
             
        </Container>
    );
}

export default DashboardUser;