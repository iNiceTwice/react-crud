import React from 'react';
import {Link} from "react-router-dom"
import Swal from "sweetalert2" //Styled alerts
import PropTypes from "prop-types"

const Product = ({id, name, price, reloadData}) => {
    
    const handleOnClick = () =>{
        
        Swal.fire({
            title: 'Estas seguro?',
            text: "Los productos eliminados no se pueden recuperar!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#17a2b8',
            cancelButtonColor: '#E44557',
            confirmButtonText: 'Sí, bórralo!'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Borrado!',
                    text: 'Tu producto ha sido eliminado.',
                    type:'success',
                    confirmButtonColor: '#17a2b8'
                }
                    
                )
                try {
                    fetch(`https://react-crud-products.herokuapp.com/api/delete/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }).then(() => { reloadData(true) }) //refresh products
                } catch (err) {
                    console.error(err)
                }        
            }
        })
    }

    return (
        <div className="row p-1 m-2 rounded">
            <div className="flex-wrapper col-8 border-right justify-content-around">
                <span>{name}</span> <span><i className="mr-1 text-success fas fa-dollar-sign"></i>{price}</span>
            </div>
            <div className="col-4 d-flex justify-content-around">
                <Link className="ml-4" to={`/products/edit/${id}`}><button className="btn btn-info"><i className="far fa-edit"></i></button></Link>
                <a className="ml-2"><button onClick={handleOnClick} className="btn btn-danger"><i className="fas fa-times"></i></button></a>
                
            </div>
        </div>
    );
}

Product.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    reloadData: PropTypes.func.isRequired
}

export default Product;

