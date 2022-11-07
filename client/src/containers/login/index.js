import React from 'react'
import { Field, Formik } from 'formik'
import {
  Button,
  Input
} from '../../components'
import { logInValidation } from '../../validationSchemas'

import {
  Container,
  FormContainer,
  Logo,
  Title,
  Group
} from './styled'
import Cookies from "universal-cookie"
import AuthRoute from "../../App"
import App from '../../App'


const initialValues = {
  email: 'marcoorduna@ciencias.unam.mx',
  password: 'nejihyuga_1A',
  picked: ''
}
const cookies = new Cookies();
const API_URL = 'http://127.0.0.1:8000/api/v1/users/'; 

const LogIn = () => {
  return (
    <Container>
      <Logo src={require('../../assets/img/png/logo/dogger_logo.png')} alt='Dogger' />
      <FormContainer>
        <Title>Iniciar Sesión</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={logInValidation}
          onSubmit={async (props) => {
            console.log('formik props >>>', props)
            let res = await getUser(props)
            const data = await res.json()
            
            console.log(data)
            if (res){
              cookies.set("name", data.name);
              cookies.set("email", data.email);
              cookies.set("last_name", data.last_name) ;
              cookies.set("adress", data.adress) ;
              cookies.set("password",data.password);
              alert(`Bienvenido ${data.name} ${data.last_name}`);
              
              window.location.href = '/dashboarduser'
            }else{
              alert("El usario o contrasena no coinciden")
            }
            
            
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
            isValid
          }) => (
            <>
              <Input
                error={errors.email}
                label='Correo'
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                type='email'
                value={values.email}
              />
              <Input
                error={errors.password}
                label='Contraseña'
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                type='password'
                value={values.password}
              />
            

              <Group>

                <div id="my-radio-group"></div>
                  <div role="group" aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="picked" value="User" />
                      Usuario
                    </label>
                    <label>
                      <Field type="radio" name="picked" value="Walker" />
                      Paseador
                    </label>
                 </div>
              </Group>

              <Button
                disabled={!isValid || isSubmitting}
                onPress={handleSubmit}
                wide
              >

                Entrar
              </Button>
            </>
          )}
        </Formik>
      </FormContainer>
    </Container>
  )
}

export const getUser = async (user) => {
  let api = API_URL.concat(String(user.password.trim()));
  api = api.concat("/")
  api = api.concat(String(user.email).trim())
  
  return await fetch(api , {
    headers: {
      'Content-Type': 'application/json',
    },
    
  });

};

export default LogIn