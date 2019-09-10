import React, { Component } from 'react';
import '../components/newDesign.css';
import Footer from '../components/footer';
import Header from '../components/header';

class KontaktSeite extends Component{
    componentDidMount(){
        window.scrollTo(0,0);
    }

    componentDidUpdate(){
        window.scrollTo(0,0);
    }

    render(){
        return(
        
        <div id = "flex-container">
            <Header route="Kontakt"/>

            <main>
                <div className="maincontainer">
                    <div className="kontaktformular">
                        <div id="kontaktcontainer">
                            <div id="sizeLoginbox">

                                Name: <input name="name"></input>
                                E-Mail: <input name="email"></input>
                                Betreff: <select name="betreff">
                                    <option>Hilfe</option>
                                    <option>Kritik</option>
                                    <option>Linktausch</option>
                                    <option>Werbung</option>
                                    <option>Sonstiges</option>
                                </select><br />
                                Nachricht: <br /><textarea name="text"></textarea><br />
                                <input name="submit" type="submit" value="absenden"></input>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
        )}
}

export default KontaktSeite;