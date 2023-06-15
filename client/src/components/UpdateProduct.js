import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateProduct = () => {
    
    const [state, setState] = useState({ name: "", price: 0, description: "" });
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();
    const { id } = useParams()

    const inputHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/products/${id}`, state)
            .then((res) => {
                console.log(res.data)
                navigate("/products")
            })
            .catch((err) => {
                // const errors = (err.response.data.errors.errors)

                // const errorArr = []
                // for (const key of Object.keys(errors)) {
                //     errorArr.push(errors[key].message)
                // }
                // setErrors(errorArr)
                console.log(err)

            })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                setState(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div>
            {/* {errors && errors.map((err, i)=>(
        <Alert variant="danger" key={i}>{err} onClose={() => setErrors([])} dism </Alert>
      )
      )} */}
            <h1>Update Product</h1>
            <form className='col-4 mx-auto d-flex flex-column gap-4 p-4' onSubmit={submitHandler}>
                <div className='form-group'>
                    <label className='mx-4'>Title</label>
                    <input type="text" name="title" onChange={inputHandler} value={state.title} />
                </div>
                <div className='form-group'>
                    <label className='mx-4'>Price</label>
                    <input type="number" name="price" onChange={inputHandler} value={state.price} />
                </div>
                <div className='form-group'>
                    <label className='mx-4'>Description</label>
                    <input type="text" name="description" onChange={inputHandler} value={state.description} />
                </div>
                <div className='form-group'>
                    <input className='btn btn-primary btn-sm' type="submit" value="Update Product" />
                </div>
            </form>
        </div>
    )
}


export default UpdateProduct