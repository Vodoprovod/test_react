import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//import App, { Search, Button, Table, updateSearchTopStoriesState } from './App';
import App, { Search, Button, Table } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('есть корректный снимок', () => {
      const component = renderer.create(
          <App/>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
});

describe('Search', () => {
    it('отрисовывает без ошибки', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search>Поиск</Search>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('есть корректный снимок', () => {
        const component = renderer.create(
            <Search>Поиск</Search>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Button', () => {
    it('отрисовывает без ошибки', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button>Больше</Button>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('есть корректный снимок', () => {
        const component = renderer.create(
            <Button>Больше</Button>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Table', () => {

    const props = {
      list: [
          { title: '1', author: '1', num_comments: 1, points: 1, objectID: 'y' },
          { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' }
      ],
        sortKey: 'TITLE',
        isSortReverse: false
    };

    it('отрисовывает без ошибки', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table { ...props } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('есть корректный снимок', () => {
        const component = renderer.create(
            <Table { ...props } />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows two items in list', () => {
        const element = shallow(
            <Table { ...props } />
        );

        expect(element.find('.table-row').length).toBe(2);
    });
});

// describe('updateSearchTopStoriesState', () => {
//         const props = {
//             hits: 50,
//             page: 1,
//             prevState: {
//                 hits: 20,
//                 page:0
//             }
//         }
//
//         it('waiting for the new state', () => {
//             const element = shallow(
//                 updateSearchTopStoriesState(...props)
//             );
//
//             expect(element)
//         });
//     }
// );