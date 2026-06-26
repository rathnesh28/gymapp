const plansRepository = require("../repositories/plans.repository");

const toId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id)) throw new Error("Invalid ID");
  return id;
};

const list = async () => plansRepository.list();
const create = async (body) => plansRepository.create(body);
const getById = async (id) => {
  const plan = await plansRepository.findById(toId(id));
  if (!plan) throw new Error("Plan not found");
  return plan;
};
const update = async (id, body) => {
  const plan = await plansRepository.update(toId(id), body);
  if (!plan) throw new Error("Plan not found");
  return plan;
};
const remove = async (id) => {
  const plan = await plansRepository.remove(toId(id));
  if (!plan) throw new Error("Plan not found");
  return plan;
};

module.exports = { list, create, getById, update, remove };
