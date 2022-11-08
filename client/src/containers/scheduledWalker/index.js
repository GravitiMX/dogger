import React, {useEffect,useState} from 'react'
import { Formik,Dropdown, Field } from 'formik'
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

const API_URL = 'http://127.0.0.1:8000/api/v1/walkers/'
const API_URL_Schedules = 'http://127.0.0.1:8000/api/v1/schedule/'

const cookies = new Cookies();


export const listdogs = async() =>{
    return await fetch(API_URL)
}

export const listschedules = async()=>{
    return await fetch(API_URL_Schedules)
}

const initialValues = {
    name: '',
    horario: '',
    
  }

const ScheduledWalker = () => {
  const [listWalker, setListWalker] = useState();
  const [listScheduled, setListScheduled] = useState();


  const listD = async() => {
      try {
          const res = await listdogs();
          const data = await res.json();
          console.log(data)
          setListWalker(data)

      } catch (error) {
          console.log(error   )
      }
  }
  const listS = async() =>{
    try {
      const res = await listdogs();
      const data = await res.json();
      console.log(data)
      setListWalker(data)

  } catch (error) {
      console.log(error   )
  }
  }

  
  useEffect(() =>{
      listD();
      listS();
  }, []); 

    return (
        <Container>

          <div>
            Registrar un Paseo
          </div>
          <div>
            Paseadores disponibles:

          </div>
          <div>
          { listWalker?.map((c) => (
                        <button name = {c.id}>
                            {c.password}
                        </button>
                      ))}
          </div>

    <Formik
        initialValues={initialValues}
        onSubmit={async (props) => {
          console.log("entro al submit")
          console.log('formik props >>>', props);
          let res = await registerDog(props);
          console.log(res)
          if (res){
            window.location.href = '/dashboarduser' 
          }

        }}
      >
        {({
          
          values,
          handleChange,
          handleSubmit,

          
        }) => (
          <>
             
             <Field as="select" name="name">
            { listWalker?.map((c) => (
              
              
                        <option name = {c.id}>
                            {c.password}
                        </option>
                      ))}
              </Field>
              




            <Field as="select" name="">


             <option value="red">Red</option>
             <option value="green">Green</option>
             <option value="blue">Blue</option>
           </Field>   
            
           
             
          


            <Button
              type = "submit"
              
              onPress={handleSubmit}
              wide
            >
              Agendar
            </Button>
          </>
        )}
      </Formik>
            
             
        </Container>
    );
}

export const registerDog = async (newDog) => {
  console.log(
    "entro a la funcion "
  
  )
  let pass = cookies.get("password")
  console.log(pass)
  return await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name" : String(newDog.name).trim(),
      "size": String(newDog.size).trim(),
      "age" : newDog.age,
      "breed":String(newDog.breed).trim(),
      "owner": String(pass)  
    })
  });

};






export default ScheduledWalker;