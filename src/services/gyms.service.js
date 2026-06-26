const gymsRepository = require("../repositories/gyms.repository");
const { hashPassword } = require("../utils/bcrypt");

const toId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id)) throw new Error("Invalid ID");
  return id;
};

const list = async () => gymsRepository.list();
const create = async (body, createdBy) => {
  const gym = await gymsRepository.create({ ...body, password_hash: await hashPassword(body.password), created_by: createdBy });
  return gym;
};
const getById = async (id) => {
  const gym = await gymsRepository.findById(toId(id));
  if (!gym) throw new Error("Gym not found");
  return gym;
};
const update = async (id, body) => {
  const gym = await gymsRepository.update(toId(id), body);
  if (!gym) throw new Error("Gym not found");
  return gym;
};
const remove = async (id) => {
  const gym = await gymsRepository.remove(toId(id));
  if (!gym) throw new Error("Gym not found");
  return gym;
};
const updateStatus = async (id, body) => {
  const gym = await gymsRepository.updateStatus(toId(id), body.status);
  if (!gym) throw new Error("Gym not found");
  return gym;
};

module.exports = { list, create, getById, update, remove, updateStatus };
