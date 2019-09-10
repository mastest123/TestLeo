import React, { Component } from 'react';

import HomeSeite from './pages/home';
import KontaktSeite from './pages/kontakt';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SeiteNichtGefunden from './pages/seiteNichtGefunden';
import Login from './pages/login';
import Impressum from './pages/impressum';
import DetailSeite from './pages/detail';
import SucheSeite from './pages/suche';
import KategorieSuchSeite from './pages/kategorieSuche';
import neuesRezeptSeite from './pages/neuesRezept';


/**
 * TODO FUER DAS GESAMTPROJEKT
 * + Login muss implementiert werden
 * + Rezepterstellung muss implementiert werden
 * + In Impressum den Fehler "The tag .. is unrecognized in this browser. If you meant to render 
 *   a React component, start its name with an uppercase letter." beheben.
 */

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={HomeSeite} exact /> 
          <Route path="/kontakt" component={KontaktSeite} />
          <Route path="/login" component={Login} />
          <Route path="/impressum" component={Impressum}/>
          <Route path="/detail/:rid" component={DetailSeite}/>
          <Route path="/suche" component={SucheSeite} />
          <Route path="/neuesrezept" component={neuesRezeptSeite} />
          <Route path="/kategoriesuche/:kid" component={KategorieSuchSeite} />
          <Route component={SeiteNichtGefunden} />
        </Switch>
      </Router>
    );
  }
}

export default App;



