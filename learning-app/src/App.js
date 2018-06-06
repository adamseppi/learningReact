import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class WelcomeParagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date ()};
  }

  componentDidMount () {
    this.timerID = setInterval (() => this.tick(), parseInt(this.props.delayScale, 10) * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <p>It is approximately {this.state.date.toLocaleTimeString()}.</p>
      </div>
    );
  }
}

class PersonRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.age}</td>
      </tr>
    );
  }
}

class CountryRow extends Component {
  render() {
    const country = this.props.country;
    return (
      <tr className="countryRow" colSpan="2">
        <td>{country}</td>
      </tr>
    );
  }
}

class PeopleTable extends Component {  
  render() {
    const rows = [];

    var tempPeople = this.props.people;
    var lastCountry = "";

    tempPeople.sort((a,b) => {
      return b.country <= a.country ? 1 : -1;
    });

    var filtered = tempPeople.filter(person => {
      return person.name.toLowerCase().includes(this.props.searchText.toLowerCase()); 
    });
    
    filtered.forEach((person) => {
      if(person.country === lastCountry){
        rows.push (
          <PersonRow name={person.name} age={person.age} key={person.name}/>
        );
      }
      else {
        rows.push (
          <CountryRow country={person.country} key={person.country}/>
        );
        rows.push (
          <PersonRow name={person.name} age={person.age} key={person.name}/>
        );
        lastCountry = person.country;
      }
    });

    return (
      <table className="peopleTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.updateSearchText = this.updateSearchText.bind(this);
  }

  updateSearchText(e) {
    this.props.updateSearchText(e.target.value);
  }

  render () {
    return (
      <input placeholder="Search Text Here" onChange={this.updateSearchText} value={this.props.searchText}/>
    );
  }
}


class PeopleList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchText: ''
    }

    this.updateSearchText = this.updateSearchText.bind(this);
  }

  updateSearchText(searchText) {
    this.setState({
      searchText: searchText
    })
  }

  render() {
    return (
      <div className={this.props.className}>
        <Search searchText={this.state.searchText} updateSearchText={this.updateSearchText}/>
        <PeopleTable searchText={this.state.searchText} people={this.props.people}/>
      </div>
    );
  }
}



const PEOPLE = [
  {name: "Adam Seppi", age: "23", country: "USA"},
  {name: "Frank Seppi", age: "62", country: "USA"},
  {name: "Kim Seppi", age: "61", country: "USA"},
  {name: "Bob Saget", age: "56", country: "Spain"},
  {name: "Stephanie Marie", age: "31", country: "Spain"},
  {name: "Roberto Garcon", age: "23", country: "Spain"},
  {name: "Stevey Ringwald", age: "23", country: "Australia"},
  {name: "Marty Jacobson", age: "23", country: "Australia"},
  {name: "Sara Meinster", age: "23", country: "Australia"},
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <WelcomeParagraph name="Adam Seppi" delayScale="1"/>
        <PeopleList people={PEOPLE} className="peopleList"/>
      </div>
    );
  }
}

export default App;
