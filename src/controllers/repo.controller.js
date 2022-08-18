const repoService = require('../services/repo.service');

const getRepoAll = async(req, res, next) => {
  try {
    const {userId} = req.params;
    const repositorys = await repoService.getRepoAll(userId);
    res.status(200).json(repositorys);
  } catch (error) {
    next(error);
  }
}

const createRepo = async(req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, url } = req.body;
    const newRepo = await repoService.createRepo(userId, name, url);
    res.status(201).json(newRepo);
  } catch (error) {
    next(error);
  }
}

const deleteRepo = async (req, res, next) => {
  try {
    const {userId, repoId} = req.params;
    await repoService.deleteRepo(userId, repoId);
    res.status(200).json(); 
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRepoAll, 
  createRepo,
  deleteRepo
}