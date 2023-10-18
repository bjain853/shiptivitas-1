import React, { useEffect, useState,useRef } from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';
import clients from './clients';

const Board=()=>{


  const [clientsState,setClientState] = useState({
    backlog:[],
    inProgress:[],
    completed:[]
  });

  const swimlanesRef =   {
          backlog: useRef(),
        inProgress: useRef(),
        complete: useRef(),
      };

  function filterClientsByStatus(clients,clientStatus){
    return clients.filter(({status})=>status===clientStatus);
  }

  function getClients() {
    if (clients.length> 0){
      return clients.map(companyDetails => ({
        id: companyDetails[0],
        name: companyDetails[1],
        description: companyDetails[2],
        status: companyDetails[3],
      }));
    }
    return []
  }

  function renderSwimlane(name, clients, ref,status) {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref} status={status}/>
    );
  }

  useEffect(()=>{

    const clientData = getClients();

    setClientState(
      {
        backlog:filterClientsByStatus(clientData,'backlog'),
        inProgress:filterClientsByStatus(clientData,'in-progress'),
        completed:filterClientsByStatus(clientData,'completed')
      }
    )

    const containers = Object.values(swimlanesRef).map(ref => ref.current)

    const drake = Dragula(containers);

    drake.on('drop',(el,target,src,sibling)=>{
      const prevStatus = el.getAttribute('data-status')
      const newStatus = target.getAttribute('status')
      if (prevStatus !== newStatus){
        switch(newStatus){
          case 'backlog':
          el.setAttribute('class','Card Card-grey')
          break
          case 'in-progress':
            el.setAttribute('class','Card Card-blue') 
            break
          case 'completed':
            el.setAttribute('class','Card Card-green') 
            break
          default:
            el.setAttribute('class','Card')
            break
        }
        el.setAttribute('data-status',newStatus)
      }

    })

    return () => {
      drake.destroy();
    };

  },[])
 
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {renderSwimlane('Backlog', clientsState.backlog, swimlanesRef.backlog,'backlog')}
            </div>
            <div className="col-md-4">
              {renderSwimlane('In Progress', clientsState.inProgress, swimlanesRef.inProgress,'in-progress')}
            </div>
            <div className="col-md-4">
              {renderSwimlane('Complete', clientsState.completed, swimlanesRef.complete,'completed')}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Board;