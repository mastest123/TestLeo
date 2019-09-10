import React, { Component } from 'react';
import './newDesign.css';
import {Link} from 'react-router-dom';

class Kategorien extends Component{
    constructor(props){
        super(props);
        this.state = {
            kategorien: [],
        };
    }

    componentDidMount(){
        fetch('/api/rezeptkategorien/' + this.props.rid)
        .then(res => res.json())
        .then(kategorien => this.setState({kategorien}, () => console.log('Kategorien fetched...', kategorien)));
    }

    render(){
        return(
            <div className = "cardtags">
                {Object.keys(this.state.kategorien).map((kategorie, i) => (
                    <p key = {i}>
                        <Link to= {"/kategoriesuche/" + this.state.kategorien[kategorie].KID}>
                            <span className= "tag">{this.state.kategorien[kategorie].Kategorie}</span>
                        </Link>
                    </p>
                    ))
                }
            </div>
    );
    }
}

export default Kategorien;