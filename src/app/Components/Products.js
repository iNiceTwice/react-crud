import React,{useState, useEffect} from 'react';
import Product from './Product';
import Header from "./Header";
import PropTypes from "prop-types"

const Products = ({products,reloadData}) => {
    return (
        <div className="marble-bg">
            <Header/>
            <div className="default-container">
                <div className="container mt-5">
                    <div className="bg-dark row py-2 rounded"> 
                        <h2 className="text-white m-auto">Productos</h2>
                    </div>
                    <div className="mt-3">
                        {(products.length == 0) ? <h5 className="mt-5 text-muted text-center">No hay productos...</h5> : null }
                        {
                            products.map((product, index) => (
                                <Product
                                    key={index}
                                    id={product._id}
                                    name={product.name}
                                    price={product.price}
                                    reloadData={reloadData}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

Products.propTypes = {
    reloadData: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
}

export default Products;