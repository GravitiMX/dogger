import React from 'react'
import { Formik, Field } from 'formik'
import {
  Button
} from '../../components'
import {
  Container,

} from './styled'
import Cookies from 'universal-cookie'

const API_URL = 'http://127.0.0.1:8000/api/v1/dog-size/'

const cookies = new Cookies();

const initialValues = {
    size: '',
    
   
  }

const RegisterSize = () => {
    return (
        <Container>

          <div>
            Registrar un tamano de eleccion del perro
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
            <Field as="select" name="size">
             <option value="pequeno">pequeno</option>
             <option value="mediano">mediano</option>
             <option value="grande">grande</option>
             
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

export const RegisterS = async (newSize) => {
  console.log(
    "entro a la funcion "
  
  )
  let pass = cookies.get("password")
  console.log(pass)

  let user = cookies.get("email") 


  return await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "size" : String(newSize.size),
      "email" : String(user)
    })
  });

};






export default RegisterSize;