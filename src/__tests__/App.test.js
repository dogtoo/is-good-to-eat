import React from 'react';
//import { render } from '@testing-library/react';
import App from '../App';
import { shallow } from 'enzyme';
import { AuthProvider } from '../Auth';

/*
it('render react', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
})
*/

describe('render App', () => {
  it('', () => {
    const appWrapper = shallow(<App />);
  });

  it('', () => {
    const appWrapper = shallow(<App />);
    appWrapper.find(AuthProvider);
  })
})
