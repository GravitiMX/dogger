import React from "react";
import ScheduleUser from "../sheduleUser";
import { Container } from "./styled";



const DashboardWalker = () => {
    
    const registrarHorario = () => {
        window.location.href = '/registrarSchedule'
    }
    


    return (
        <Container>
            
            <button onClick={registrarHorario}>
              Registrar un Horario 
            </button>

            
        
             
        </Container>
    );
}

export default DashboardWalker;