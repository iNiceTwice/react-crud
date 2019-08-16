import React from 'react';
import {Link} from "react-router-dom"
 
const Header = () => {
    return ( 
        <div className="container-fluid header font-varela bg-darkblue ">
            <div className="row flex-wrapper header-sub">
                <div className="col-6">
                    <a href="/" className="wow fadeInLeft logo font-serif text-white"><span className="color-pink">be</span>Admin</a>
                </div>
                <div className="col-6 flex-wrapper">
                    <Link className="link" to="/products">
                        <button className="wow fadeInLeft btn btn-light btn-small">Productos</button>
                    </Link>
                    <Link to="/products/add">
                        <button className="wow fadeInLeft btn btn-danger btn-small">Añadir<i className="ml-2 fas fa-plus"></i></button>
                    </Link> 
                </div>
            </div>
        </div>
    );
}
 
export default Header;

