import React from 'react';
import Card from './Card';
import './Swimlane.css';

 const Swimlane = (props) => {
    const {name,clients,dragulaRef,status} = props

    const cards = clients.map(client => {
      return (
        <Card
          key={client.id}
          id={client.id}
          name={client.name}
          description={client.description}
          status={client.status}
        />
      );
    });

    return (
      <div className="Swimlane-column">
        <div className="Swimlane-title">{name}</div>
        <div className="Swimlane-dragColumn" ref={dragulaRef} status={status}>
          {cards}
        </div>
      </div>);
  }

  export default Swimlane;