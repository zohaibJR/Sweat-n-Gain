import React, { useState } from 'react'
import '../CurrentWeight/CurrentWeight.css'

function CurrentWeight() {

    const [Weight, setWeight] = useState(84)

  return (
    <div className='CurrentWeight'>
      <h1>Current Weight</h1>
      <h2>{Weight} kg</h2>
    </div>
  )
}

export default CurrentWeight
