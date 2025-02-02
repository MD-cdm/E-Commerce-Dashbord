import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/Signup')
    }







    return (
        <div>
            <img  className='logo' src="https://png.pngtree.com/template/20210709/ourmid/pngtree-shopping-logo-design-image_545854.jpg"/>
            {auth ? <ul className="nav-ul">

                <li><a href="/">Products</a></li>
                <li><a href="/add">Add Product</a></li>
                <li><a href="/update">Update Product</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a onClick={logout} href="/Signup">Logout ({JSON.parse(auth).name})</a></li>

            </ul>
                :
                <ul  className="nav-ul nav-right">
                    <li> <a href="/Signup">Signup</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            }



        </div >
    )
}

export default Nav;