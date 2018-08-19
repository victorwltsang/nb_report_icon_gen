import React from 'react';
import './IconsList.css';

const iconsList = (props) => {

  let iconsList = props.icons.map((icon, i) => {
    return (<div key={icon.name + i}>
      <img src={icon.url} alt={icon.name}/>
      <p>{icon.name}</p>
    </div>)
  });

  return(
    <div className="IconsList">
      {iconsList}
    </div>
  );
};


export default iconsList;
