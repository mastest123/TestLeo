import React, { Component } from 'react';
import '../components/newDesign.css';
import Header from '../components/header';
import Footer from '../components/footer';

class neuesRezeptSeite extends Component {
    constructor(){
        super();
        this.state = {
            titel:"",
            bildpfad:"",
            beschreibung:"",
            tags:[],
            existierendeTags:[],
            taglisten:[]
        };
    }

    componentDidMount(){
        fetch('/api/kategorienamen')
        .then(res => res.json())
        .then(existierendeTags => this.setState({existierendeTags}, () => console.log('Kategorienamen fetched...', existierendeTags)));
    }

    tagHinzufuegen = () => {
        
    }

    // wird gebraucht um dynamisch die taglisten zu erweitern mithilfe des states
    taglistenAnzeigen() {
        return(
            <select id="tagedit">
                {Object.keys(this.state.existierendeTags).map((tag, i) => (
                    <option key={i}>{this.state.existierendeTags[tag].Kategorie}</option>
                ))
                }
            </select>
        );
    }

    rezeptErstellen = () => {
        console.log("titel: " + this.state.titel);
        console.log("bildpfad: " + this.state.bildpfad);
        console.log("beschreibung: " + this.state.beschreibung);

        const titel = this.state.titel;
        const bildpfad = this.state.bildpfad;
        const beschreibung = this.state.beschreibung;
        const bid = "1"; //TODO AUSGETAUSCHT WERDEN

        // Rezept Datenbank hinzufuegen
        fetch('/api/rezept/',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rezept: {titel, beschreibung, bildpfad, bid}})
        })
        .then(res => res.json())
        .then(res => {
            const {hinzugefuegt, error} = res;

            if(error && !hinzugefuegt){
                window.alert("Rezept konnte nicht erstellt werden. Versuche es später nochmal")
            }
        });

        // Tags hinzufuegen
        // TODO


    }

    
    render(){
        return(
            <div id="flex-container">
                <Header route="Neues Rezept"/>

                <main>
                    <div className="maincontainer">
                        <div className="boxcarddetail">
                            <div className="cardcaption cardcaption_add">
                                <input type="textfield" className="titleNewRecipe" placeholder="Titel" maxLength="70" onChange={(event) => this.setState({titel: event.target.value})} />
                            </div>
                            <div className="cardbody">
                                <div className="cardpicture">
                                    <img id="foodpicturedetailedit" src="AUSTAUSCHEN" alt="Kein Vorschaubild vorhanden"></img>
                                    <input type="textfield" name="pictureurl" placeholder="Bild-URL" autoComplete="off" onChange={(event) => this.setState({bildpfad: event.target.value})} />
                                </div>
                                <div className="detailtext">
                                    <input type="textfield" name="reciptdescription" placeholder="Beschreibe das Rezept" autoComplete="off" onChange={(event) => this.setState({beschreibung: event.target.value})} />
                                </div>
                                <div className="upload_column">
                                    <div className="cardtagsdetail">
                                        <div className="cardtags">
                                            {this.taglistenAnzeigen()}
                                        </div>
                                        <div className="cardtagedit">
                                            <button className="add_tag" onClick={this.tagHinzufuegen}>+ Tag</button>
                                            <button className="delete_tag">
                                                <img src="AUSTAUSCHEN" alt="LÖSCHEN"></img>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="upload">
                                        <button className="upload_recipt" onClick={this.rezeptErstellen}>Rezept hochladen</button>
                                    </div>
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

export default neuesRezeptSeite;