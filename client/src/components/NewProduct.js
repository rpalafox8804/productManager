import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NewProduct = () => {
  const [state, setState] = useState({name:"", price:0, description:""});
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
    const submitHandler = (e) => {
      e.preventDefault();
      axios.post("http://localhost:8000/api/products", state)
        .then((res)=>{
          console.log(res.data)
          navigate("/products")
        })
        .catch((err)=>{
          const errors =(err.response.data.errors.errors)

          const errorArr = []
          for (const key of Object.keys(errors)){
            errorArr.push(errors[key].message)
          }
          setErrors(errorArr)

        })
    }
  
  return (
    <div>
      {/* {errors && errors.map((err, i)=>(
        <Alert variant="danger" key={i}>{err} onClose={() => setErrors([])} dism </Alert>
      )
      )} */}
      <h1>New Product</h1>
      <form className='col-4 mx-auto d-flex flex-column gap-4 p-4' onSubmit={submitHandler}>  
        <div className='form-group'>
          <label className='mx-4'>Title</label>
          <input type="text" name ="title" onChange={inputHandler} value={state.title}/>
        </div>
        <div className='form-group'>
          <label className='mx-4'>Price</label>
          <input type="number" name ="price" onChange={inputHandler} value={state.price}/>
        </div>
        <div className='form-group'>
          <label className='mx-4'>Description</label>
          <input type="text" name ="description" onChange={inputHandler} value={state.position}/>
        </div>
        <div className='form-group'>
          <input className='btn btn-primary btn-sm' type="submit" value="Create Product"/>
        </div>
      </form>
    </div>
  )
}

export default NewProduct