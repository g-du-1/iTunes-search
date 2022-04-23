import axios from 'axios';

export function loadSearchAPI(term, offset) {
  return axios.get(`/api/v1/search/?term=${term}&offset=${offset}`).then(res => res.data);
}