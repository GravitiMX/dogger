import React, {useEffect,useState} from 'react'
import { Formik, Field } from 'formik'
import {
  Button
} from '../../components'
import {
  Container,
} from './styled'
import Cookies from 'universal-cookie'
import SelectList from "../../components/selecList"
const API_URL_WALKERS = 'http://127.0.0.1:8000/api/v1/walkers/'

const API_URL = 'http://127.0.0.1:8000/api/v1/dogs3/';
const API_URL_SCHEDULES = 'http://127.0.0.1:8000/api/v1/scheduled-walks/'
const cookies = new Cookies();


const initialValues = {
    dog : '',
    walkerV: '',
    dayV: '',
    hourV: ''
    
  }

  export const listdogs = async() =>{
    let api = API_URL.concat(cookies.get('email'))
    
    return await fetch(api)
}

  export const  listWalkers = async()=>{
    return await fetch(API_URL_WALKERS)
  }

  
const ScheduledWalker = ({title, url, handleChange}) => {

  const [walker, setWalker] = useState('')
  
  const [scheduleDay, setScheduleDay] = useState('')
  const [scheduleHour, setScheduleHour] = useState('')
  const [listWalker, setListWalker] = useState();
 
  


  const listW = async() => {
    try {
      const res = await listWalkers();
      const data = await res.json()
      setListWalker(data)
      
    } catch (error) {
      
    }
  }
  const [listDog, setListDog] = useState();



    const listD = async() => {
        try {
            const res = await listdogs();
            const data = await res.json();
            console.log(data)
            setListDog(data)

        } catch (error) {
            console.log(error   )
        }
    }
    
    
  useEffect(() =>{
    listW();
    listD();
  }, []);
 
    return (
        <Container>

          <h2>
            Registrar un paseo
          </h2>

          <h2>
            Paseadores Disponibles

          </h2>
          <div>
          { listWalker?.map((c) => (
                        <button name = {c.name}>
                            {c.name}
                        </button>
           ))}
          </div>
          
    <Formik
        initialValues={initialValues}
        onSubmit={async (props) => {
          props.walkerV = walker
          props.dayV = scheduleDay
          props.hourV = scheduleHour
         
          console.log('formik props >>>', props);
          let res = await registerSchedule(props);
          console.log(res)
          if (res){
            alert("Paseo registrado con exito")
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
    
            <div>
            <h2>Selecciona el perro que deseas agendar</h2>

             <div>
                  <Field as="select" name="dog">
                { listDog?.map((c) => (
                  <>
                  
                <option value={c.name}>{c.name}</option>
                
                  </>
                
                
                ))};
                </Field>

             
              </div> 

            <h2>
              Ahora selecciona el paseador que desees
              </h2>       
            
            <SelectList 
            name = "walker"
            title = 'name' 
            url ='http://127.0.0.1:8000/api/v1/walkers/'
            handleChange = {(e)=>{
                setWalker(e.target.value)}} 
            />
            {walker && (
                <SelectList 
                
                title = 'day' 
                url = {`http://127.0.0.1:8000/api/v1/schedule-day-for-walker/${walker}/`}
                handleChange = {(e)=>{
                    setScheduleDay(e.target.value)
                    
                }
                } 
                />
            )}
            
            {scheduleDay && (
                <SelectList

                title = 'hour' 
                url = {`http://127.0.0.1:8000/api/v1/schedule-hour-for-walker-and-day/${walker}/${scheduleDay}`}
                handleChange = {(e)=>{
                    setScheduleHour(e.target.value)}} 
                />
            )}



            
            

        </div>


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

export const registerSchedule = async (newSchedule) => {
  console.log(
    "entro a la funcion "
  
  )
  let pass = cookies.get("password")
  console.log(pass)
  return await fetch(API_URL_SCHEDULES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "day_of_week" : String(newSchedule.dayV).trim(),
      "hour": String(newSchedule.hourV).trim(),
      "dog" : String(newSchedule.dog).trim(), 
      "walker": String(newSchedule.walkerV).trim(),
      "owner" : String(cookies.get("email")).trim()
    })
  });

};






export default ScheduledWalker;