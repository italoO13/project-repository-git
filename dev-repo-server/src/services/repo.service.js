const Repo = require('../models/Repo');

const getRepoAll = async (userId, q) => {
  const response = await Repo.getRepoAll(userId, q);
  return response;
}

const createRepo = async (userId, name, url) => {
  const repo = await Repo.createRepo(userId, name, url);
  return repo;
}

const deleteRepo = async(userId, repoId) => {
  const response = await Repo.deleteRepo(userId, repoId);
  return response;
}


module.exports = {
  getRepoAll,
  createRepo,
  deleteRepo
}