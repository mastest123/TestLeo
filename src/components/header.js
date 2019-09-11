import React, { Component} from 'react';
import './newDesign.css';
import logo from '../icon_001.svg';
import {Link} from'react-router-dom';
import Filter from './filter';

class Header extends Component{

  constructor(){
    super();
    this.state = {
      suchbegriff: "",
      aktivierteTagFilter: [],
      datumVon: "",
      datumBis: "",
      route: ""
    }
  }

  componentDidMount(){
    this.setState({route: this.props.route});
  }

  handleTagUpdate = (tagArr) => {
    this.setState({aktivierteTagFilter: tagArr});
    //console.log(this.state.aktivierteTagFilter);
  }

  handleDatumVonUpdate = (date) => {
    this.setState({datumVon: date});
  }

  handleDatumBisUpdate = (date) => {
    this.setState({datumBis: date});
  }

  handleSuche(){
    var suchAnfrage = "/suche?begriff=" + this.state.suchbegriff;

    // wenn Tags ausgewaehlt worden sind
    if(this.state.aktivierteTagFilter.length > 0){
      suchAnfrage += "&tags=";

      for(var i=0; i<this.state.aktivierteTagFilter.length; i++){
        var tag = this.state.aktivierteTagFilter[i];
        suchAnfrage += tag;

        // Wenn nicht letzter tag -> _ anfuegen fuer naechstes tag
        if(i !== this.state.aktivierteTagFilter.length-1){
          suchAnfrage += "_";
        }
      }
    }
    
    // wenn Von-Datum eingegeben wurde
    if(this.state.datumVon !== ""){
      suchAnfrage += "&datumvon=" + this.state.datumVon;
    }

    // wenn Bis-Datum eingegeben wurde
    if(this.state.datumBis !== ""){
      suchAnfrage += "&datumbis=" + this.state.datumBis;
    }

    // Suchen mit oder ohne parameter
    return suchAnfrage;
  }
    render(){
        return(
            <header>
                <div className = "header">
                <meta name="mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                  <a href= "/"><img id= "boxpicture" src={logo} alt= "Bild kann nicht geladen werden"></img></a>
                  <div id = "boxcaption">
                    <h1 id = "Maincaption">Captain Cook - [{this.state.route}]</h1>
                  </div>
    
                  <div id = "boxlogin">
                    <form className = "search">
                      <Link to={"/neuesrezept"}>
                        <button className="btn-start">Neues Rezept</button>
                      </Link>                    
                      <input type="search" name="q" placeholder="Search" autoComplete="off" defaultValue="" onChange={(event) => this.setState({suchbegriff: event.target.value})}></input>
                      <Link to={this.handleSuche()} >
                        <button className="btn-start">Go!</button>
                      </Link>
                      <Link to={"/login"}>
                        <button className="btn-start">Login</button>
                      </Link>
                    </form>
                  </div>
    
                </div>
                <Filter handleTagUpdate={this.handleTagUpdate} handleDatumVonUpdate={this.handleDatumVonUpdate} handleDatumBisUpdate={this.handleDatumBisUpdate}/>
              </header>
        );
}
}

export default Header;