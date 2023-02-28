import React from 'react'
import { ellipsis } from '../../helpers'
import { FiArrowRight } from 'react-icons/fi'
import './style.css'

const Section1 = ({data}) => {
  return (
    <div className='homepage-section1-container'>
        <div>
            <p>{data.left.title}</p>
            <p>{ellipsis(170 , data.left.main)}</p>
            <button type='button'>{data.left.button.name} <FiArrowRight /></button>
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