import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

// const list = [
//     {
//         title: 'React',
//         url: 'https://reactjs.org',
//         author: 'Jordan Walke',
//         num_comments: 3,
//         points: 4,
//         objectID: 0
//     },
//     {
//         title: 'Redux',
//         url: 'https://redux.js.org',
//         author: 'Dan Abramov, Andrew Clarck',
//         num_comments: 2,
//         points: 5,
//         objectID: 1
//     },
//     {
//         title: 'Mail.ru',
//         url: 'https://mail.ru',
//         author: 'Syoma',
//         num_comments: 7,
//         points: 8,
//         objectID: 2
//     }
// ];

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

function isSearched(searchTerm) {
    return function (item) {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
}

class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
        result: null,
        searchTerm: DEFAULT_QUERY
      };

      this.setSearchTopStories = this.setSearchTopStories.bind(this);
      this.onDismiss = this.onDismiss.bind(this);
      this.onSearchChange = this.onSearchChange.bind(this);
    }

    setSearchTopStories(result) {
        this.setState({ result });
    }

    componentDidMount() {
        const { searchTerm } = this.state;

        fetch(`${ PATH_BASE }${ PATH_SEARCH }?${ PARAM_SEARCH }${ searchTerm }`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }

    onDismiss(id) {

        const isNotId = item => item.objectID !== id;

        //const updatedList = this.state.list.filter(isNotId);
        const updatedHits = this.state.result.hits.filter(isNotId);

        this.setState({
            result: { ...this.state.result, hits: updatedHits }
        });
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

  render() {

    const { searchTerm, result } = this.state;
    console.log(this.state);

    //if (!result) { return null }

    return (
      <div className="page">
          <div className="interactions">
              <Search
                value = { searchTerm }
                onChange = { this.onSearchChange }
              >
                  Поиск:
              </Search>
          </div>
          { result ?
              <Table
                  list={ result.hits }
                  pattern={ searchTerm }
                  onDismiss={ this.onDismiss }
              />
              : null
          }
      </div>
    );
  }
}


const Search = ({ value, onChange, children }) =>
    <form>
        <span>{ children }</span>
        <input
            type="text"
            value={ value }
            onChange={ onChange }
        />
    </form>;

const Table = ({ list, pattern, onDismiss }) =>
    <div className="table">
    { list.filter(isSearched(pattern)).map( item  =>
        <div key={ item.objectID } className="table-row">
            <span style={{ width: '40%' }}>
              <a href={ item.url }>{ item.title }</a>
            </span>
            <span style={{ width: '30%' }}>{ item.author }</span>
            <span style={{ width: '10%' }}>{ item.num_comments }</span>
            <span style={{ width: '10%' }}>{ item.points }</span>
            <span style={{ width: '10%' }}>
                <Button
                    onClick={() => onDismiss(item.objectID)}
                    className="button-inline"
                >
                    Отбросить
                </Button>
            </span>
        </div>
    ) }
    </div>;

const Button = ({ onClick, className = '', children }) =>
    <button
        onClick = { onClick }
        className= { className }
        type="button"
    >
        { children }
    </button>;

export default App;




