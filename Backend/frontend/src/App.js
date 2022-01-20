import React, { Component } from 'react';
import './App.css';
import CustomApi from './Components/CustomApi';
import SearchApi from './Components/ItunesSearch';


class App extends Component {
    render() {
        return (
      
      <div className="App">
                <SearchApi/>
                <CustomApi/>
            </div>
        );

    }
}

export default App;