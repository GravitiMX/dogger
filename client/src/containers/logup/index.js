import React from 'react'
import { Formik, Field } from 'formik'
import {
  Button,
  Input
} from '../../components'
import { logUpValidation } from '../../validationSchemas'
import {
  Container,
  Title,
  Group
    
} from './styled'
import { useHistory } from 'react-router-dom'



const API_URL_USER = 'http://127.0.0.1:8000/api/v1/users/'
const API_URL_WALKER = 'http://127.0.0.1:8000/api/v1/walkers/'

const initialValues = {
  email: 'marcoorduna@ciencias.unam.mx',
  password: 'nejihyuga_1A',
  name: 'Marco',
  lastName: 'Avila',
  phone: '5574879293',
  address: 'Maximo Garcia',
  confirmPassword: 'nejihyuga_1A',
  picked: ''
}



const LogUp = () => {
  let history = useHistory()
  
  return (
    <Container>
      <Title>Registro</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={logUpValidation}
        
        onSubmit={async (props) => {
          console.log('formik props >>>', props);
          console.log(props.picked)
          if (props.picked == 'User'){
            await registerUser(props);
            history.push("/")
          }else{
            await registerWalker(props);
            history.push("/")

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
              error={errors.name}
              label='Nombre(s)'
              name='name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              
            />
            <Input
              error={errors.lastName}
              label='Apellidos'
              name='lastName'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              
            />
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
              error={errors.phone}
              label='Teléfono'
              name='phone'
              onBlur={handleBlur}
              onChange={handleChange}
              type='tel'
              value={values.phone}
              
            />
            <Input
              error={errors.address}
              label='Domicilio'
              name='address'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address}
              
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
            <Input
              error={errors.confirmPassword}
              label='Confirmar contraseña'
              name='confirmPassword'
              onBlur={handleBlur}
              onChange={handleChange}
              type='password'
              value={values.confirmPassword}
              
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
              Registrarse
            </Button>
          </>
        )}
      </Formik>
    </Container>
  )
}

var post_data = {
  
  'csrfmiddlewaretoken':"{{ csrf_token }}"
  
}


export const registerUser = async (newUser) => {
  return await fetch(API_URL_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    
    data:post_data,
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


export const registerWalker = async (newUser) => {
  return await fetch(API_URL_WALKER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    
    data:post_data,
    body: JSON.stringify({                                    
      "name" : String(newUser.name).trim(),
      "email": String(newUser.email).trim(),
      "password": String(newUser.password).trim(),
      "last_name":String(newUser.lastName).trim(),
      "phone": String(newUser.phone).trim(),
      "adress":String(newUser.address).trim(),
      "avalible" : true
    })
  });

};

export default LogUp