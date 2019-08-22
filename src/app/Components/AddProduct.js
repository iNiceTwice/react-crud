import React, {useState} from 'react';
import {withRouter} from "react-router-dom"
import Error from "./Error"
import Swal from "sweetalert2" //Styled alerts
import Header from "./Header";
import PropTypes from "prop-types"

const AddProduct = ({history,reloadData}) => {
    
    // set states
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = useState(false) //triggered when validation fails 

    const handleSubmit = e => {
        e.preventDefault()
    
        if(name === "" || price === "" || price < 1){
            setError(true)
            return
        }

        try{
            fetch("https://react-crud-products.herokuapp.com/api/add",{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    price
                })
            }).then(()=>{
                reloadData(true) //refresh products
                Swal.fire({
                    type: 'success',
                    title: 'Bien!',
                    text: 'Producto creado con éxito',
                })
            })
        }catch(err){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Algo salió mal! Intenta nuevamente',
            })
            console.error(err)
        }
        history.push("/products") //redirect
    }

    return (
        <div className="marble-bg">
            <Header />
            <div className="default-container">
                <div className="container mt-5">
                    <div className="row rounded bg-dark text-white py-2">
                        <h2 className="m-auto">Añadir Productos</h2>
                    </div>
                    {(error) ? <Error message="Todos los campos son obligatorios."/>: null}
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Introduzca el nombre</label>
                            <input 
                                onChange={e => {setName  (e.target.value)}}
                                type="text" 
                                className="form-control" placeholder="Ejemplo: Televisor"
                            />
                        </div>
                            <div className="form-group">
                                <label>Introduzca el precio</label>
                            <input 
                                onChange={e=>{setPrice(e.target.value)}} type="number" 
                                className="form-control" placeholder="Ejemplo: 1000"    
                            />
                            </div>
                            <button className="btn btn-info btn-block" type="submit">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

AddProduct.propTypes = {
    history: PropTypes.object.isRequired,
    reloadData: PropTypes.func.isRequired
}

export default withRouter(AddProduct);

