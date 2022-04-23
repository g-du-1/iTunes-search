import axios from 'axios';

export function loadSearchAPI(term: string, offset: number) {
  return axios.get(`/api/v1/search/?term=${term}&offset=${offset}`).then(res => res.data);
}