import React from "react";
import RegisterDog from "../registerDog";
import ScheduleUser from "../sheduleUser";
import { Container } from "./styled";



const DashboardUser = () => {
    
    const registrarPerro = () => {
        window.location.href = '/registrarPerro'
    }
    return (
        <Container>
            
            <button onClick={registrarPerro}>
              Registrar un Perro  
            </button>
            <ScheduleUser>
            </ScheduleUser>
             
        </Container>
    );
}

export default DashboardUser;