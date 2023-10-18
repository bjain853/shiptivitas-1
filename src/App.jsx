import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HomeTab from './HomeTab';
import Navigation from './Navigation';
import Board from './Board';
import './App.css';

const App = () => {

  const [selectedTab,setSelectedTab] = useState('home');
  
  const changeTab = (tabName) => setSelectedTab(tabName)

  const renderShippingRequests = ()=> <Board/>
  
  const renderNavigation=()=> (<Navigation
      onClick={(tabName) => changeTab(tabName)}
      selectedTab={selectedTab}
      />);


  const renderTabContent = () => {
    switch(selectedTab) {
      case 'shipping-requests':
        return renderShippingRequests();
      case 'home':
      default:
        return <HomeTab/>;
        
    }
  }

  return (
    <div className="App">
      {renderNavigation()}
      <div className="App-body">
        {renderTabContent()}
      </div>
    </div>
  )

}

export default App;
