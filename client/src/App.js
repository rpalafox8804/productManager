import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import UpdateProduct from './components/UpdateProduct';
import NewProduct from './components/NewProduct';
import Dashboard from './components/Dashboard';
import ViewProduct from './components/ViewProduct';



function App() {
    const [state, setState] = useState("")

    // useEffect(() => {
    // axios.get("http://localhost:8000/api/products")
    //   .then((res)=>{
    //     setState(res.data)
    //   })
    //   .catch((err)=>{
    //     console.log(err)
    //   })
    // }, [])

  return (

    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<NewProduct />} />
            <Route path="/products/:id" element={<ViewProduct />} />
            <Route path="/products/:id/edit" element={<UpdateProduct />} />
            <Route path="/products/new" element={<NewProduct />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
