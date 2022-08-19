const Repo = require('../models/Repo');

const getRepoAll = async (userId) => {
  const response = await Repo.getRepoAll(userId);
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