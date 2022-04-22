import axios from 'axios';

export function loadSearchAPI() {
  return axios.get(`/api/v1/search/`).then(res => res.data);
}