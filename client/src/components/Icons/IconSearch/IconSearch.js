import React from 'react';
import './IconSearch.css';

const iconSearch = (props) => (

  <div className="IconSearch">
    <input type="text" onChange={props.inputHandler} value={props.userInput} onKeyDown={props.inputKeyPress}/>
     <button onClick={props.submit}>Submit</button>
  </div>
);

export default iconSearch;
