import React from "react"
import SelectList from "../selecList"
import { useState } from "react"




const SelectAnidados = (props)=>{
    const [walker, setWalker] = useState('')
    const [scheduleDay, setScheduleDay] = useState('')
    const [scheduleHour, setScheduleHour] = useState('')
    return (
        <div>
            <h2>Select Anidados</h2>
            <SelectList 
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
                    props.setWalker(e.target.value)
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



            
            <pre>
                <code>
                    {walker}-{scheduleDay-scheduleHour}
                </code>
            </pre>

        </div>

    )
 
}

export default SelectAnidados