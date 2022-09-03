const Repo = require('../shemaModels/repo.shemadb');
const User = require('../shemaModels/user.shemadb');
const CustomError = require('../utils/customError');


const getRepoAll = async(userId, q) => {
  let query = {};
  if(q) {
    query = { url: {$regex: q}}
  }

  const user = await User.findById(userId);

  if(!user) {
    throw new CustomError(404, 'User not exists')
  }
  
  const repo = await Repo.find({
    userId,
    ...query
  })

  if(!repo) {
    throw new CustomError(422, 'Repository not found')
  }
  return repo;
}

const createRepo = async(userId, name, url) => {

  const user = await User.findById(userId);

  if(!user) {
    throw new CustomError(404, 'User not exists')
  }

  const repo = await Repo.find({
    url,
    userId
  })
  if(repo) {
    throw new CustomError(422, 'Repository already exists')
  }
  const newRepo =  await Repo.create({
    name, 
    url, 
    userId
  });
  return newRepo;
}

const deleteRepo = async (userId, repoId) => {
  const user = await User.findById(userId);

  if(!user) {
    throw new CustomError(404, 'User not exists')
  }

  const repo = await Repo.findById(repoId);
  if(!repo) {
    throw new CustomError(404, 'Repository not exists');
  }
  await repo.deleteOne();
  return true;
}

module.exports = {
  getRepoAll,
  createRepo,
  deleteRepo
}