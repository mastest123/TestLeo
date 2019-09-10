import React, { Component } from 'react';
import '../components/newDesign.css';
import Kategorien from '../components/kategorien';
import Footer from '../components/footer';
import Header from '../components/header';
import {Link} from 'react-router-dom';

import queryString from 'query-string';

class SucheSeite extends Component {
    constructor(){
        super();
        this.state = {
            rezepte: []
        };
    }

    componentDidMount(){
        this.ladeSeite();

        //fetch('/api/suche/' + suchbegriff)
        //.then(res => res.json())
        //.then(rezepte => this.setState({rezepte}, () => console.log('Rezepte fetched...', rezepte)));
    }

    // Sollte bei der Suche nochmal neu gesucht werden
    componentDidUpdate(nextProps) {
        if(this.props.match.params !== nextProps.match.params){
            this.ladeSeite();  
        }

    }

    ladeSeite(){
        const values = queryString.parse(this.props.location.search)
        const begriff = values.begriff;
        var datumvon = values.datumvon;
        var datumbis = values.datumbis;
        const tags = values.tags;

        var kategorien = [];
        if(tags){
            kategorien = tags.split('_');
        }

        if(datumvon){
            datumvon += " 00:00:00";
        } else {
            datumvon = "undefined";
        }

        if(datumbis){
            datumbis += " 23:59:59";
        } else {
            datumbis = "undefined";
        }


        fetch('/api/filtersuche/',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({suche: {begriff, datumvon, datumbis, kategorien}})
        })
        .then(res => res.json())
        .then(rezepte => this.setState({rezepte}, () => console.log('Rezepte fetched...', rezepte)));
    }


    render(){
        return(
            <div id = "flex-container">
              <Header route="Suche"/>
            
              <main>
                <React.Fragment>
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
                    </div>
                </div>
            </div>
        ))}
        </div>  
            </React.Fragment>              
              </main>
    
              <Footer />
    
            </div>
            
            
        );
    }
}

export default SucheSeite;