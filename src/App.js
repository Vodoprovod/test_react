import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://reactjs.org',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org',
        author: 'Dan Abramov, Andrew Clarck',
        num_comments: 2,
        points: 5,
        objectID: 1
    },
    {
        title: 'Mail.ru',
        url: 'https://mail.ru',
        author: 'Syoma',
        num_comments: 7,
        points: 8,
        objectID: 2
    }
];

function isSearched(searchTerm) {
    return function (item) {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
}

class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
        list,
        searchTerm: ""
      };

      this.onDismiss = this.onDismiss.bind(this);
      this.onSearchChange = this.onSearchChange.bind(this);
    }

    onDismiss(id) {

        const isNotId = item => item.objectID !== id;

        const updatedList = this.state.list.filter(isNotId);

        this.setState({ list: updatedList });
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

  render() {

    const { searchTerm, list } = this.state;
    return (
      <div className="App">
          <form>
              <input
                  type="text"
                  value={ searchTerm }
                  onChange={ this.onSearchChange }
              />
          </form>
          { list.filter(isSearched(searchTerm)).map( item  =>
                  <div key={ item.objectID }>
                    <span>
                      <a href={ item.url }>{ item.title }</a>
                    </span>
                    <span>{ item.author }</span>
                    <span>{ item.num_comments }</span>
                    <span>{ item.points }</span>
                    <span>
                        <button
                            onClick={() => this.onDismiss(item.objectID)}
                            type="button"
                        >
                            Отбросить
                        </button>
                    </span>
                  </div>
          ) }
      </div>
    );
  }
}

export default App;
