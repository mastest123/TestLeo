import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './newDesign.css';

class Footer extends Component{
    render(){
        return(
            <footer>
                <Link to="/impressum">Impressum</Link>
                <Link to="/kontakt">&nbsp;| Kontakt</Link>
            </footer>
        );
    }
}

export default Footer;

