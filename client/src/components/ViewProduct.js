import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const ViewProduct = () => {
  const {id} = useParams()
  const [state, setState] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)  
      .then((res)=>{
        setState(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
  }, [])
  return (
    <div>
      <h1>Product Information</h1>
      <h2>Title: {state.title}</h2>
      <h3>Price: {state.price}</h3>
      <h3>Description: {state.description}</h3>
      <Link to={`/products`} className='btn btn-sm btn-warning'>Dashboard</Link>
    </div>
  )
}

export default ViewProduct