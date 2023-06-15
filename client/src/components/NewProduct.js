import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard'



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
          setProductState([...productState, res.data]); 
          navigate("/products")
        })
        .catch((err)=>{
          // const errors =(err.response.data.errors.errors)
          // const errorArr = []
          // for (const key of Object.keys(errors)){
          //   errorArr.push(errors[key].message)
          // }
          // setErrors(errorArr)
          console.log(err)
        })

    }
  const [productState, setProductState] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
      .then((res)=>{
        setProductState(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
  }, [])
  const deleteHandler = (id) => {
    const newList = productState.filter((product, idx) => (product._id != id) )
    setProductState(newList)

    axios.delete(`http://localhost:8000/api/products/${id}`)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
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
       <div>
      <h1>Dashboard</h1>
      <table className='table table-striped table-bordered'>
        <thead className='bg-primary'>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            productState.map((product, i)=>{

              return (
                <tr key={i}>
                  <td><Link to={`/products/${product._id}`}>{product.title}</Link></td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <Link to={`/products/${product._id}/edit`} className='btn btn-sm btn-warning'>Edit</Link>
                    <button className='btn btn-sm btn-danger' onClick={() => deleteHandler (product._id)}> Delete</button>
                  </td>
                </tr>
              )
            }
            )
          }
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default NewProduct