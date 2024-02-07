import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaUser } from "react-icons/fa";
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import { TiWeatherCloudy } from "react-icons/ti";
import { MdLogout } from "react-icons/md";


export class Header extends Component {
    static displayName = Header.name;
    static toggle = true;

    constructor(props) {
        super(props);

        this.openLogin = this.openLogin.bind(this);
        this.login = this.login.bind(this);
    }

    openLogin() {
        this.toggle = !this.toggle;

        $("#loginWindow").css("display", this.toggle ? 'block' : 'none');
    }

    login() {
        let user = $("#user").val();
        let pass = $("#password").val();

        if (user === "" || pass === "") {
            alert("Debe completar todos los campos.");
        }
        else {
            localStorage.setItem("user", user);
            localStorage.setItem("password", CryptoJS.SHA1(pass));
            $("#loginWindow").css("display", 'none');
            window.location.reload();
        }
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("password");
        window.location.reload();
    }


    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navBarComplete" container light>
                    <NavbarBrand tag={Link} to="/"><TiWeatherCloudy /> Climita</NavbarBrand>
                    {localStorage.getItem("user") != null && <div className="navbar-nav flex-grow">
                        <span className="userButton" onClick={this.logout}><MdLogout /> Cerrar Sesi&oacute;n</span>
                    </div>}
                    {localStorage.getItem("user") == null && <ul className="navbar-nav flex-grow">
                        <span className="userButton" id="toggle" onClick={this.openLogin}>Iniciar Sesi&oacute;n <FaUser /></span>
                        <div id="loginWindow">
                            <label htmlFor="user">Usuario</label>
                            <input className="inputsLogin" type="text" id="user" /><br />
                            <label className="labelPassword" htmlFor="password">Contrase&ntilde;a</label>
                            <input className="inputsLogin" type="password" id="password" /><br />
                            <button id="login" className="submitButton" onClick={this.login}>Iniciar Sesi&oacute;n</button>
                        </div>
                    </ul>}
                </Navbar>
            </header>
        );
    }
}