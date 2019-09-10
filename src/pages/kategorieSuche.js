import React, { Component } from 'react';
import '../components/newDesign.css';
import Kategorien from '../components/kategorien';
import Footer from '../components/footer';
import Header from '../components/header';
import {Link} from 'react-router-dom';

class KategorieSuchSeite extends Component {
    constructor(){
        super();
        this.state = {
            rezepte: []
        };
    }

    componentDidMount(){
        window.scrollTo(0,0);

        fetch('/api/kategoriesuche/' + this.props.match.params.kid)
        .then(res => res.json())
        .then(rezepte => this.setState({rezepte}, () => console.log('Rezepte fetched...', rezepte)));
    }

    componentDidUpdate(){
        window.scrollTo(0,0);
    }

    render(){
        return(
            <div id = "flex-container">
              <Header route="Kategoriesuche"/>
            
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

export default KategorieSuchSeite;