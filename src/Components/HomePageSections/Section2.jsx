import React from 'react'
import { ellipsis } from '../../helpers'

const Section2 = ({data}) => {
  return (
    <div className='homepage-section2-container'>
        <p>{data.title}</p>
        <p>{ellipsis(500,data.main)}</p>
        <p>{data.footer}</p>
    </div>
  )
}

export default Section2