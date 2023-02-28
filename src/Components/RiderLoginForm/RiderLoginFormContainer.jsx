import React from 'react'
import RiderLoginForm from './RiderLoginForm'
import './style.css'
import { useDispatch } from 'react-redux'
import { RiderLoginFormActions } from '../../rtk/features/RiderLoginFormSlice'
const RiderLoginFormContainer = () => {
  const dispatch = useDispatch()
  const handleClick = e =>{
    if(e.target === e.currentTarget){
      dispatch(RiderLoginFormActions.setIsVisible(false))
    }
  }
  return (
    <div className='rider-login-form-container' onClick={handleClick}>
        <RiderLoginForm />
    </div>
  )
}

export default RiderLoginFormContainer