import React from 'react';
import {Link} from "react-router-dom"

const Home = () => {
    return ( 
        <div>
            <div className="home flex-wrapper">
                <div className="p-2">
                    <div className="wow fadeInUp">
                        <a href="/" className="logo-lg font-serif mb-3 text-white"><span className="color-pink">be</span>Admin</a>
                    </div>
                    <div className="wow fadeIn w-100">
                        <Link to="/products">
                            <button className="btn btn-danger btn-block">Empezar<i className="ml-2 fas fa-caret-right"></i></button>
                        </Link> 
                    </div>
                </div>
            </div>
           
        </div>
    );
}
 
export default Home;