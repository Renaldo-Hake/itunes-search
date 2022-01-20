import React from 'react';
import renderer from 'react-test-renderer';
import SearchApi from './Components/ItunesSearch';


// Snapshot test for itunesSearch component
it('snapshot test', () => {
  const tree = renderer
    .create(<SearchApi/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


// testing itunes api inside itunesSearch
test('the data is Beyoncé', () => {
  const name = 'Beyoncé';
  return fetch(`https://itunes.apple.com/search?term=Beyonce`)
  .then(res => res.json())
  .then(data => {
    const response = data.results[1];
    expect(response.artistName).toBe(name);
  });
});