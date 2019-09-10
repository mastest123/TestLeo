import React, { Component } from 'react';
import '../components/newDesign.css';
import Footer from '../components/footer';
import Header from '../components/header';

class Login extends Component{
    render(){
        return(
            <div id = "flex-container">
                <Header route="Login" />
            
                <main>
                    <div className="maincontainerLogin">
                        <div id = "logincontainer">
                            <div id = "sizeLoginbox">
                            <input type = "text" name = "username" placeholder = "Username" required />
                            <input type = "password" name = "password" placeholder = "Passwort" required />
                            <input type = "submit" name = "btnLoginsite" value = "Login" />   
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )}
}

export default Login;