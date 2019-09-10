import React, { Component } from 'react';
import './newDesign.css';

class Filter extends Component{

    constructor(props){
        super(props);
        this.state = {
            kategorienamen: [],
            aktivierteTagFilter: [],
            datumVon: "",
            datumBis: ""
        };
    }

    componentDidMount(){
        fetch('/api/kategorienamen')
        .then(res => res.json())
        .then(kategorienamen => this.setState({kategorienamen}, () => console.log('Kategorienamen fetched...', kategorienamen)));
    }

    openFilter(){
        if(document.getElementById("filter").style.display === "none" || document.getElementById("filter").style.display === ""){
            document.getElementById("filter").style.display = "flex"
        }else{
         document.getElementById("filter").style.display = "none"
        }
    }
    

    placeIfEven(name, i){
        if(i%2===0){
            return(
                
                <React.Fragment key={i}>
                    <input type="checkbox" onChange={(event) => this.handleCheckboxChange(this.state.kategorienamen[name].KID, event.target.checked)} name={this.state.kategorienamen[name].Kategorie} value={this.state.kategorienamen[name].Kategorie} /> 
                    {this.state.kategorienamen[name].Kategorie} <br />
                </React.Fragment>
            );
        } 
    }

    placeIfUneven(name, i){
        if(i%2!==0){
            return(               
                <React.Fragment key={i}>
                    <input type="checkbox" onChange={(event) => this.handleCheckboxChange(this.state.kategorienamen[name].KID, event.target.checked)} name={this.state.kategorienamen[name].Kategorie} value={this.state.kategorienamen[name].Kategorie} /> 
                    {this.state.kategorienamen[name].Kategorie} <br />
                </React.Fragment>
            );
        } 
    }

    // FUNKTIONIERT
    handleCheckboxChange(kid, isChecked){
        const arr = this.state.aktivierteTagFilter
        
        if (arr.includes(kid) && !isChecked){
            delete arr[arr.indexOf(kid)];
            arr.sort();
            arr.pop();

        } else if (!arr.includes(kid) && isChecked){
            arr.push(kid);
        }

        this.props.handleTagUpdate(arr);
    }

    handleDatumVonChange(datum){
        this.setState({datumVon: datum});
        this.props.handleDatumVonUpdate(datum);
    }

    handleDatumBisChange(datum){
        this.setState({datumBis: datum});
        this.props.handleDatumBisUpdate(datum);
    }

    render(){
        return(
            <React.Fragment>
            <div className="filterbox" id="filter" name="filterbox">
                <div>
                    Erstelldatum von <input type="search" name="q" onChange={(event) => this.handleDatumVonChange(event.target.value)} placeholder="01.01.1980" autoComplete="off" />
                    bis <input type="search" name="q" onChange={(event) => this.handleDatumBisChange(event.target.value)} placeholder="01.01.9999" autoComplete="off" />
                </div>
                <div>
                    {Object.keys(this.state.kategorienamen).map((name, i) => (
                        this.placeIfEven(name, i)
                    ))
                    }
                </div>
                <div>
                    {Object.keys(this.state.kategorienamen).map((name, i) => (
                        this.placeIfUneven(name, i)
                    ))
                    }
                </div>
            </div>
            <div className="filter" id="filterbutton">
                <button className="filterbutton1" onClick={this.openFilter}>Filter</button>
            </div>
            </React.Fragment>
        );
    }
}

export default Filter;