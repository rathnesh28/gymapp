const subscriptionsRepository = require("../repositories/subscriptions.repository");

const toId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id)) throw new Error("Invalid ID");
  return id;
};

const list = async () => subscriptionsRepository.list();
const create = async (body) => subscriptionsRepository.create(body);
const getById = async (id) => {
  const item = await subscriptionsRepository.findById(toId(id));
  if (!item) throw new Error("Subscription not found");
  return item;
};
const update = async (id, body) => {
  const item = await subscriptionsRepository.update(toId(id), body);
  if (!item) throw new Error("Subscription not found");
  return item;
};
const updateStatus = async (id, body) => {
  const item = await subscriptionsRepository.updateStatus(toId(id), body.status);
  if (!item) throw new Error("Subscription not found");
  return item;
};

module.exports = { list, create, getById, update, updateStatus };
