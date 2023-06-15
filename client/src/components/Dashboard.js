import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'


const Dashboard = () => {
  const [state, setState] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
      .then((res)=>{
        setState(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
  }, [])
  const deleteHandler = (id) => {
    const newList = state.filter((product, idx) => (product._id != id) )
    setState(newList)

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
            state.map((product, i)=>{

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
      <Link to="/products/new" >Create a Product</Link>
    </div>
  )
}

export default Dashboard