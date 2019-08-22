import React ,{useState, useRef} from 'react'
import {withRouter} from "react-router-dom"
import Error from "./Error"
import Swal from "sweetalert2" //Styled alerts
import Header from "./Header";
import PropTypes from "prop-types"



const EditProduct = (props) => {

    const { history, product, reloadData } = props;

    //seting references 
    const productNameRef = useRef("")
    const productPriceRef = useRef("")
    
    //error state
    const [error, setError] = useState(false) //triggered when validation fails 

    const handleSubmit = e => {
        e.preventDefault()

        const editedProduct = {
            name:productNameRef.current.value,
            price:productPriceRef.current.value
        }
        // validation
        if (productNameRef.current.value === "" || productPriceRef.current.value === "") {
            setError(true)
            return
        }

        try {
            fetch(`https://react-crud-products.herokuapp.com/api/products/edit/${product._id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedProduct)
            }).then(()=>{
                reloadData(true) //refresh products
                history.push("/products") //redirect 
                Swal.fire({
                    type: 'success',
                    title: 'Bien!',
                    text: 'Producto editado con éxito',
                })
            })
        } catch (err) {
            console.error(err)
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Algo salió mal! Intenta nuevamente',
            })
        }
    }
    
    return (
        <div className="marble-bg">
            <Header />    
            <div className="default-container">
                <div className="container mt-5">
                    <div className="row rounded bg-dark text-white py-2">
                        <h2 className="text-white m-auto">Editar Productos</h2>
                    </div>
                    {(error) ? <Error message="Todos los campos son obligatorios." /> : null}
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Reintroduzca el nombre</label>
                            <input
                                type="text" 
                                className="form-control" placeholder="Ejemplo: Televisor" 
                                ref={productNameRef}
                                defaultValue={product.name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Reintroduzca el precio</label>
                            <input
                                type="number" 
                                className="form-control" placeholder="Ejemplo: 1000" 
                                ref={productPriceRef}
                                defaultValue={product.price}
                            />
                        </div>
                        <button className="btn btn-info btn-block" type="submit">Guardar</button>
                    </form>
                </div>    
            </div>
        </div>
                
    );
}

EditProduct.propTypes = {
    history: PropTypes.object.isRequired,
    reloadData: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

export default withRouter(EditProduct);

