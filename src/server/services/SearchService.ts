import axios, { AxiosResponse } from 'axios';

export default class SearchService {
  async getSearchResults(term, offset): Promise<AxiosResponse<Array<object>, any>> {
    const response = await axios({
      url: `https://itunes.apple.com/search?term=${term}&media=music&entity=musicArtist,album,song&country=US&limit=10&offset=${offset}`,
      method: 'get',
    });
    return response.data.results;
  }
}
