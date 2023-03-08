import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
const Error = ({code , text}) => {
    const navigate = useNavigate()
  return (
    <div className='error-401-page'>
        <p>{code}</p>
        <p>{text}</p>
        <button onClick={()=>{
            navigate('/')
        }}>Go to Home</button>
    </div>
  )
}

export default Error