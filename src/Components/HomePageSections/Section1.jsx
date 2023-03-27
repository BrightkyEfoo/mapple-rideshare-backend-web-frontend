import React from 'react'
import { ellipsis } from '../../helpers'
import { FiArrowRight } from 'react-icons/fi'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { RiderLoginFormActions } from '../../rtk/features/RiderLoginFormSlice'

const Section1 = ({data}) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()
  return (
    <div className='homepage-section1-container'>
        <div>
            <p>{data.left.title}</p>
            <p>{ellipsis(170 , data.left.main)}</p>
            <button type='button' onClick={()=>{
              if(user && user.accessLevel === 0){
                navigate(data.left.button.url)
              }else{
                dispatch(RiderLoginFormActions.setType('rider'));
                dispatch(RiderLoginFormActions.setIsVisible(true));
              }
            }}>{data.left.button.name} <FiArrowRight /></button>
        </div>
        <div>
            <img src={data.right.image} alt=''/>
            <div className='red-circle'></div>
            <div className='green-circle'></div>
        </div>
    </div>
  )
}

export default Section1