import React, {Component} from 'react';

import './App.css';

class App extends Component {
  state = {
    icons: [],
    userInput: ""
  };

  componentDidMount() {
    this.initialIcons().then(res => this.setState({icons: res.icons})).catch(err => console.log(err));
  }

  initialIcons = async () =>{
    const response = await fetch('/api/all-icons');
    const body = await response.json();
    return body;
  }

  callApi = async () => {

    let {userInput} = {...this.state};

    this.setState({
      userInput: ""
    });

    console.log(userInput);
    const response = await fetch(`/api/icon?name=${userInput}`);
    const body = await response.json();

    if (response.status !== 200)
      throw Error(body.message);

    let newIcons = [...this.state.icons];
    newIcons.push(body)
    this.setState({icons: newIcons});
  };

  inputHandler = (event) => {
    this.setState({userInput: event.target.value})
  }
  keyPress = (event) => {
    if (event.keyCode === 13) {
      this.setState({userInput: event.target.value})
      this.callApi(this.state.userInput);
    }
  }

  render() {

    let calledLogos = this.state.icons.map((icon, i) => {
      return (<div key={icon.name + i}>
        <img src={icon.url} alt={icon.name}/>
        <p>{icon.name}</p>
      </div>)
    });

    return (<div className="App">
      <h1>NetBase Live Report Icon Generator Prototype</h1>
      <div className="IconSearch">
        <input type="text" onChange={this.inputHandler} value={this.state.userInput} onKeyDown={this.keyPress}/>
         <button onClick={this.callApi}>Submit</button>
      </div>

      <div className="IconsGrid">
        {calledLogos}
      </div>
    </div>);
  }
}

export default App;
