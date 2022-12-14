import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dev-repo-server-git.herokuapp.com'
});

export const getRepositories = async(userId, query) => {
  let url = `/repo/${userId}`
  if(query) {
    url += `?q=${query}`
  }
  return api.get(url);
}

export const createRepositories = async(userId, urlInput) => {
  const url = `/repo/${userId}`
  const name = getRepoName(urlInput);
  return api.post(url, {
    name,
    url: urlInput
  })
}

const getRepoName = (url) => {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)/
  const valid = regex.test(url)
  if(!valid) {
    throw new Error('Formato da url inválida');
  }
  const values = url.match(regex);
  if(values[2]) {
    const [, user, rep] = values[2].split('/');
    return `${user}/${rep}`
  }
}


export const createSession = async(email, password) => {
  const url = `/session`;
  return api.post(url, {
    email,
    password
  })
}

export const createAcount = async(email, password) => {
  const url = `/user`;
  return api.post(url, {
    email,
    password
  })
}

export const deleteRepository = async(userId, repoId) => {
  const url = `/repo/${userId}/${repoId}`
  return api.delete(url);
}