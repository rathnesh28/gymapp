const membersRepository = require("../repositories/members.repository");

const toId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id)) throw new Error("Invalid ID");
  return id;
};

const list = async (gymId) => membersRepository.listByGym(gymId);
const create = async (gymId, body) => membersRepository.create({ ...body, gym_id: gymId });
const getById = async (gymId, id) => {
  const item = await membersRepository.findById(gymId, toId(id));
  if (!item) throw new Error("Member not found");
  return item;
};
const update = async (gymId, id, body) => {
  const item = await membersRepository.update(gymId, toId(id), body);
  if (!item) throw new Error("Member not found");
  return item;
};
const remove = async (gymId, id) => {
  const item = await membersRepository.remove(gymId, toId(id));
  if (!item) throw new Error("Member not found");
  return item;
};

module.exports = { list, create, getById, update, remove };
