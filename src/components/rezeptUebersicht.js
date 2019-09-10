import React, { Component } from 'react';
import './newDesign.css';
import Kategorien from '../components/kategorien';
import {Link} from 'react-router-dom';


class RezeptUebersicht extends Component{
    constructor(){
        super();
        this.state = {
            rezepte: []
        };
    }

    componentDidMount(){
        fetch('api/rezeptuebersicht')
        .then(res => res.json())
        .then(rezepte => this.setState({rezepte}, () => console.log('Rezepte fetched...', rezepte)));
    }

    loescheRezept = (rid) => {
        fetch('/api/deleterezept/' + rid,{
            method: 'DELETE',
        })
        .then(res => res.json());
    }


    render(){
        return(
            <div className = "maincontainer">
        {Object.keys(this.state.rezepte).map((rezept, i) => (
            <div key = {i} className = "sm-9 md-6 lg-3 col">
                <div className = "boxcard">
                    <div className = "cardcaption">
                        <h2 id = "foodcardcaption">{this.state.rezepte[rezept].Titel}</h2>
                    </div>

                    <div className = "cardbody">
                        <div className = "cardpicture">
                            <Link to= {"/detail/" + this.state.rezepte[rezept].RID}>
                                <img id = "foodpicture" src={this.state.rezepte[rezept].Bildpfad} alt="Bild nicht verfügbar"></img>
                            </Link>
                        </div>
                        
                        <Kategorien rid={this.state.rezepte[rezept].RID} />

                    </div>

                    <div className = "cardmore">
                        <Link to={"/detail/" + this.state.rezepte[rezept].RID}>
                            <button className = "btn-readmore">Mehr Lesen</button>
                        </Link>
                        <button className = "btn-edit">Editieren</button>
                        <button className = "btn-delete" onClick={() => this.loescheRezept(this.state.rezepte[rezept].RID)}>Löschen</button>
                    </div>
                </div>
            </div>
        ))}
        </div>);  
    }
}

export default RezeptUebersicht;