const Repo = require('../models/Repo');

const getRepoAll = async (userId) => {
  const response = await Repo.getRepoAll(userId);
  return response;
}

const createRepo = async (userId, name, url) => {
  const repo = await Repo.createRepo(userId, name, url);
  return repo;
}


module.exports = {
  getRepoAll,
  createRepo
}