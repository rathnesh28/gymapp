const packagesRepository = require("../repositories/packages.repository");

const toId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id)) throw new Error("Invalid ID");
  return id;
};

const list = async (gymId) => packagesRepository.listByGym(gymId);
const create = async (gymId, body) => packagesRepository.create({ ...body, gym_id: gymId });
const update = async (gymId, id, body) => {
  const item = await packagesRepository.update(gymId, toId(id), body);
  if (!item) throw new Error("Package not found");
  return item;
};
const remove = async (gymId, id) => {
  const item = await packagesRepository.remove(gymId, toId(id));
  if (!item) throw new Error("Package not found");
  return item;
};

module.exports = { list, create, update, remove };
