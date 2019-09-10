import React, { Component } from 'react';
import '../components/newDesign.css';
import Header from '../components/header';
import Footer from '../components/footer';
import {Link} from 'react-router-dom';

class DetailSeite extends Component{
    constructor(props){
        super(props);
        this.state = {
            details:[],
            kategorien:[]
        };
    }


    componentDidMount(){      
        window.scrollTo(0,0);

        fetch('/api/rezept/' + this.props.match.params.rid)
        .then(res => res.json())
        .then(details => this.setState({details}, () => console.log('Rezept fetched...', details)));

        fetch('/api/rezeptkategorien/' + this.props.match.params.rid)
        .then(res => res.json())
        .then(kategorien => this.setState({kategorien}, () => console.log('Kategorien fetched...', kategorien)));
    }

    componentDidUpdate(){
        window.scrollTo(0,0);
    }

    render(){
        return(
            <div id="flex-container">
                <Header route="Rezeptansicht"/>
            <main>
                <div className="maincontainer">
                    <div className="boxcarddetail">
                        <div className="cardcaption timestamp">
                            <h2 id="foodcardcaption">{this.state.details.length!==0 ? this.state.details[0].Titel : ""}</h2>
                            <p className="erstelldatum">{this.state.details.length!==0 ? this.state.details[0].erstelldatum.substring(0,10) : ""}</p>
                        </div>
                        <div className="cardbody">
                            <div className="cardpictured">
                                    <img id="foodpicturedetail" src={this.state.details.length!==0 ? this.state.details[0].Bildpfad : ""} alt="BILD NICHT GELADEN"></img>
                            </div>
                            <div className="detailtext">
                                <p style={{ whiteSpace: 'pre-wrap' }}>{this.state.details.length!==0 ? this.state.details[0].Beschreibung : ""}</p>
                            </div>
                            <div className="cardtagsdetail">
                                {Object.keys(this.state.kategorien).map((kategorie, i) => (
                                    <p key = {i}>
                                        <Link to= {"/kategoriesuche/" + this.state.kategorien[kategorie].KID}>
                                            <span className= "tag">{this.state.kategorien[kategorie].Kategorie}</span>
                                        </Link>
                                    </p>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            </div>

        );
    }
}

export default DetailSeite;