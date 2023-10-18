import React from 'react';
import './Card.css';

export default function Card(props){

    const {status,id,name,description} = props
    
    return (
      <div className={'Card'} data-id={id} data-status={status}>
        <div className="Card-title">{name}</div>
        <div>
          {description}
        </div>
      </div>
    );
  }