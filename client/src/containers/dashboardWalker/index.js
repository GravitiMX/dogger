import React from "react";
import ScheduleUser from "../sheduleUser";
import { Container } from "./styled";



const DashboardWalker = () => {
    
    const registrarHorario = () => {
        window.location.href = '/registrarSchedule'
    }
    
    const registerSize = () => {
        window.location.href = '/registerSize'
    }


    return (
        <Container>
            
            <button onClick={registrarHorario}>
              Registrar un Horario 
            </button>

            <button onClick={registerSize}>
                Registrar un tamano de perro    
            </button>

            
        
             
        </Container>
    );
}

export default DashboardWalker;