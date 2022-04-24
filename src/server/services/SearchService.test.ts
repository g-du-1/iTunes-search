import SearchService from './SearchService';

// TODO Look into how to make these faster
test('getSearchResults returns the artist as the first result', async () => {
  const term = 'therion';
  const offset = '0';
  const searchService = new SearchService();
  const searchResults = await searchService.getSearchResults(term, offset);
  const artistResult = searchResults[0];
  expect(artistResult.artistName).toEqual('Therion');
});

test('getSearchResults returns different results when offset is set', async () => {
  const term = 'therion';
  let offset = '0';
  const searchService = new SearchService();
  const searchResults = await searchService.getSearchResults(term, offset);
  const artistResult = searchResults[0];
  offset = '10';
  const offsetResults = await searchService.getSearchResults(term, offset);
  const newFirstResult = offsetResults[0];
  expect(artistResult).not.toEqual(newFirstResult);
});
