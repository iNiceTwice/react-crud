import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./Header";
import Products from "./Products";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import Product from "./Product";
import Home from "./Home"

const App = () => {
    
    //Set states:
    const [products, setProducts] = useState([])
    const [reloadData, setReloadData] = useState(true) // use it as a flag for refresh content 

    //consult API
    const getProducts = () => {
        if (reloadData) {
            fetch("https://react-crud-products.herokuapp.com/api/products")
                .then(data => data.json())
                .then(data => {
                    setProducts(data)
                })
            setReloadData(false)
        }

    }

    useEffect(() => {
        getProducts()
    }, [reloadData]) //waiting "relaodData" changes for new render

    return ( 
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/products" render={()=>(
                  <Products
                    reloadData={setReloadData}
                    products={products}
                  />  
                )}/>
                <Route exact path="/products/add" render={()=>(
                    <AddProduct
                        reloadData={setReloadData}
                    />
                )} />
                <Route exact path="/products/edit/:id" render={props=>{
                    let productID = props.match.params.id 
                    let product = products.filter(product=> product._id === productID)
                    return (
                        <EditProduct
                            reloadData={setReloadData}
                            product={product[0]}
                        />
                    )
                }} />
            </Switch>
        </Router>
    );
}
 
export default App;

