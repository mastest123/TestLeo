import React, { Component } from 'react';
import '../components/newDesign.css';
import Footer from '../components/footer';
import Header from '../components/header';


class Impressum extends Component{
    componentDidMount(){
        window.scrollTo(0,0);
    }

    componentDidUpdate(){
        window.scrollTo(0,0);
    }

    render(){
        return(
            <div id = "flex-container">
                <Header route="Impressum"/>
            
                <main>
                    <div className="maincontainer">
                        <div className = "impressumtext">
                            <p>
                                <h7 id="sitecaptionimp"> Impressum </h7>
                                <br/><h8 id="impressumcaption"> Captaincook.netlifly.com ist ein Projekt von:</h8>
                                <br/>Captaincook GmbH
                                <br/>Treskowallee 8
                                <br/>10318 Berlin
                                <br/>Tel : 0162 123456789
                                <br/>Web: 
                                <br/>Geschäftsführer: Leonhard Zehner, Jeremy Jacobi, Nele Malzahn

                                <br/><h8 id="impressumcaption">Haftungshinweis</h8>
                                <br/>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.

                                <br/><h8 id="impressumcaption">Bildupload</h8> 
                                <br/>Bitte beachten Sie unsere Hinweise und Richtlinien zum Upload von Bildern!
                                <br/><iframe title="homemap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.27711069529!2d13.524311215304338!3d52.492223246040616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8492ec1bcdfbb%3A0x2973e0d479e1978c!2sTreskowallee+8%2C+10318+Berlin!5e0!3m2!1sde!2sde!4v1565007126152!5m2!1sde!2sde" id= "placecard"></iframe>
                            </p>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )}
}

export default Impressum;