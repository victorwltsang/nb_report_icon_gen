import React, {Component} from 'react';
import IconSearch from './components/Icons/IconSearch/IconSearch.js';
import IconsList from './components/Icons/IconsList/IconsList.js';
import './App.css';

class App extends Component {
  state = {
    icons: [],
    userInput: ""
  };

  componentDidMount() {
console.log('hi');
    this.initialIcons().then(res => {

      this.setState({icons: res.icons});

    }).catch(err => console.log(err));

  }

  initialIcons = async () => {
    const response = await fetch('/api/all-icons');
    const body = await response.json();
    return body;
  }


  duplicateIconValidation =  () => {

    let {userInput} = {
      ...this.state
    };

    if (!userInput) {
      return false;
    }

    let result = this.state.icons.find(icon =>{
      return (icon.name === userInput);
    });



    if (result) {

      this.setState({userInput: ""});
      let newIcons = [...this.state.icons];
      newIcons.push(result);
      fetch(`/api/icon-db?name=${result.name}`);


      this.setState({
        icons:newIcons
      });

    } else {
      this.callApi();
    }

  }

  callApi = async () => {
    console.log(this.state.userInput);
    let {userInput} = {
      ...this.state
    };
    this.setState({userInput: ""});
    const response = await fetch(`/api/icon?name=${userInput}`);
    const body = await response.json();

    if (response.status !== 200)
      throw Error(body.message);

    let newIcons = [...this.state.icons];
    newIcons.push(body);
    this.setState({icons: newIcons});
  };

  inputHandler = (event) => {
    this.setState({userInput: event.target.value});
  }
  keyPress = (event) => {

    if (event.keyCode === 13) {
      this.setState({userInput: event.target.value});
      this.duplicateIconValidation();
    }
  }

  render() {

    return (<div className="App">
      <h1>NetBase Live Report Icon Generator Prototype</h1>
      <IconSearch inputHandler={this.inputHandler} inputKeyPress={this.keyPress} userInput={this.state.userInput} submit={this.duplicateIconValidation}/>

      <IconsList icons={this.state.icons}/>
    </div>);
  }
}

export default App;
