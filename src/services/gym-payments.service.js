const paymentsRepository = require("../repositories/payments.repository");

const list = async (gymId) => paymentsRepository.listByGym(gymId);
const create = async (gymId, body) => paymentsRepository.create({ ...body, gym_id: gymId });

module.exports = { list, create };
