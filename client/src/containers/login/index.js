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

const initialValues = {
  email: '',
  password: '',
  picked: ''
}

const API_URL = ''; 

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

export const getUser = async (newUser) => {
  return await fetch(API_URL, {
    
    headers: {
      'Content-Type': 'application/json',
    },
    
    body: JSON.stringify({
      "name" : String(newUser.name).trim(),
      "email": String(newUser.email).trim(),
      "password": String(newUser.password).trim(),
      "last_name":String(newUser.lastName).trim(),
      "phone": String(newUser.phone).trim(),
      "adress":String(newUser.address).trim(),
    })
  });

};

export default LogIn