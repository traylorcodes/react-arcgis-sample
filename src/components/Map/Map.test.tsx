import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Map />, div);
  ReactDOM.unmountComponentAtNode(div);
});