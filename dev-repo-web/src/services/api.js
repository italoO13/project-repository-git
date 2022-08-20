import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3005'
});

export const getRepositories = async(userId, query) => {
  let url = `/repo/${userId}`
  if(query !== '') {
    url += `?q=${query}`
  }
  return api.get(url);
}


export const deleteRepository = async(userId, repoId) => {
  const url = `/repo/${userId}/${repoId}`
  return api.delete(url);
}