import React, { Component } from 'react';
import '../components/newDesign.css';
import RezeptUebersicht from '../components/rezeptUebersicht';
import Footer from '../components/footer';
import Header from '../components/header';

class HomeSeite extends Component{

    render() {
        return (
    
            <div id = "flex-container">
              <Header route="Home"/>
            
              <main>
                <React.Fragment>
                  <RezeptUebersicht />
                </React.Fragment>              
              </main>
    
              <Footer />
    
            </div>
        );
      }
}

export default HomeSeite;