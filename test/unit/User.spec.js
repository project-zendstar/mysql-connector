const {
  sequelize,
  dataTypes,
  checkModelName,
  makeMockModels,
  checkPropertyExists
} = require("sequelize-test-helpers");

const UserModel = require("../models/User");

describe("test/models/User", () => {
  const Model = UserModel(sequelize, dataTypes);
  const instance = new Model();

  checkModelName(Model)("users");

  context("properties", () => {
    [
      "id",
      "personalIdentityNumber",
      "firstName",
      "lastName",
      "street",
      "zipCode",
      "city",
      "phoneNumber",
      "email",
      "isBlocked",
      "isRegistred",
      "isDeleted",
      "lastLogin",
      "lastCheck",
      "country",
      "createdAt",
      "updatedAt"
    ].forEach(checkPropertyExists(instance));
  });
});
