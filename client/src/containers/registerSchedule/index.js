import React from 'react'
import { Formik, Field } from 'formik'
import {
  Button,
  Input
} from '../../components'
import registerDogValidation  from "../../validationSchemas/registerDog.js"
import {
  Container,
  Group
} from './styled'
import Cookies from 'universal-cookie'

const API_URL = 'http://127.0.0.1:8000/api/v1/schedule/'

const cookies = new Cookies();

const initialValues = {
    day: '',
    hour:0
   
  }

const RegisterSchedule = () => {
    return (
        <Container>

          <div>
            Registrar un Scheduele
          </div>

    <Formik
        initialValues={initialValues}
        onSubmit={async (props) => {
          console.log("entro al submit")
          console.log('formik props >>>', props);
          let res = await RegisterS(props);
          console.log(res)
          if (res){
            window.location.href = '/dashboardwalker' 
          }

        }}
      >
        {({
          
          values,
          handleChange,
          handleSubmit,

          
        }) => (
          <>
            <Field as="select" name="day">
             <option value="Lunes">Lunes</option>
             <option value="Martes">Martes</option>
             <option value="Miercoles">Miercoles</option>
             <option value="Jueves">Jueves</option>
             <option value="Viernes">Viernes</option>
             <option value="Sabado">Sabado</option>
             <option value="Domingo">Domingo</option>
           </Field>
           
           <Field as="select" name="hour">
             <option value="7">7am-8am</option>
             <option value="8">8am-9am</option>
             <option value="9">9am-10am</option>
             <option value="10">10am-11am</option>
             <option value="11">11am-12pm</option>
             <option value="12">12pm-1pm</option>
             <option value="13">1pm-2pm</option>
             <option value="14">2pm-3pm</option>
             <option value="15">3pm-4pm</option>
             <option value="16">4pm-5pm</option>
             <option value="17">5pm-6pm</option>
             <option value="18">6pm-7pm</option>
             <option value="19">7pm-8pm</option>
             <option value="20">8pm-9pm</option>
             <option value="21">9pm-10pm</option>
           </Field>
            
            

            <Button
              type = "submit"
              
              onPress={handleSubmit}
              wide
            >
              Registrarse
            </Button>
          </>
        )}
      </Formik>
            
             
        </Container>
    );
}

export const RegisterS = async (newDog) => {
  console.log(
    "entro a la funcion "
  
  )
  let pass = cookies.get("password")
  console.log(pass)

  let user = cookies.get("password") 


  return await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "day" : String(newDog.day).trim(),
      "hour" : parseInt(newDog.hour),
      "password" : String(user)
    })
  });

};






export default RegisterSchedule;