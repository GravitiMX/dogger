import React from 'react'
import { Formik, Field } from 'formik'
import {
  Button,
  Input
} from '../../components'
import {
  Container,
  Group
} from './styled'
import Cookies from 'universal-cookie'

const API_URL = 'http://127.0.0.1:8000/api/v1/dogs/'

const cookies = new Cookies();

const initialValues = {
    name: 'Marco',
    breed :'puddle',
    age: 8,
    size: '',
    owner: ''
  }

const RegisterDog = () => {
    return (
        <Container>

          <div>
            Registrar un Perro
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
            <Input

              label='Nombre'
              name='name'

              onChange={handleChange}
              value={values.name}
              
            />
            
            <Input
              
              label='Raza'
              name='breed'
              onChange={handleChange}
              type='breed'
              value={values.breed}
              

            />
            <Input
              
              label='Edad'
              name='age'
              onChange={handleChange}
              type='age'
              value={values.age}
              

            />

            
            <Group>

            <div id="my-radio-group"></div>
              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="size" value="small" />
                  Chico
                </label>
                <label>
                  <Field type="radio" name="size" value="medium" />
                  Mediano
                </label>
                <label>
                  <Field type="radio" name="size" value="large" />
                  Grande
                </label>

              


            </div>
            </Group>
           
             
          


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

export const registerDog = async (newDog) => {
  console.log(
    "entro a la funcion "
  
  )
  let email = cookies.get("email")
  console.log(email)
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
      "owner": String(email)  
    })
  });

};






export default RegisterDog;