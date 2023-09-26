import React from 'react';
import ReactDOM from 'react-dom';
import LayerList from './LayerList';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LayerList />, div);
  ReactDOM.unmountComponentAtNode(div);
});