const { match, stub, resetHistory } = require("sinon");
const chai = require("chai");
chai.use(require("sinon-chai"));
const expect = chai.expect;

const proxyquire = require("proxyquire");
const path = require("path");
const modelPath = path.join(__dirname, "../models");

const { makeMockModels } = require("sequelize-test-helpers");

describe("src/app", () => {
  const validUser = {
    id: 1,
    personalIdentityNumber: "191010101010",
    firstname: "john",
    lastname: "doe",
    email: "john.doe.test.tes",
    isRegistered: 1
  };

  const invalidUser = {
    id: 1,
    personalIdentityNumber: "191010101010",
    firstname: "john",
    lastname: "doe",
    email: "john.doe.test.tes"
  };

  const missingUser = {
    id: 100,
    personalIdentityNumber: "191010101010",
    firstname: "john",
    lastname: "doe",
    email: "john.doe.test.tes"
  };

  const User = {
    create: stub(),
    findOne: stub(),
    update: stub(),
    destroy: stub()
  };

  const mockModels = makeMockModels({ User }, modelPath);
  const app = proxyquire("../../src/app", {});

  context("user create", () => {
    before(async () => {
      User.create.withArgs(validUser).resolves({
        type: "success",
        message: "User created!",
        result: {
          id: validUser.id,
          personalIdentityNumber: "191010101010",
          firstName: "john",
          lastName: "doe",
          isRegistred: 1,
          updatedAt: new Date(),
          createdAt: new Date()
        }
      });

      User.create.withArgs(invalidUser).rejects({
        type: "error",
        message: "Error while creating user!",
        result: {
          name: "SequelizeValidationError",
          errors: [
            {
              message: "users.isRegistred cannot be null",
              type: "notNull Violation",
              path: "isRegistred",
              value: null,
              origin: "CORE",
              instance: {
                id: null,
                personalIdentityNumber: "191010101010",
                firstName: "john",
                lastName: "doe",
                updatedAt: "2019-11-23T17:27:13.306Z",
                createdAt: "2019-11-23T17:27:13.306Z"
              },
              validatorKey: "is_null",
              validatorName: null,
              validatorArgs: []
            }
          ]
        }
      });
    });

    it("called app.createOne", () => {
      return app.createOne(validUser, mockModels.User).then(res => {
        expect(res).to.be.ok;
        expect(res.message).to.equal("User created!");
      });
    });

    it("called app.createOne with invalid argument", () => {
      expect(() => app.createOne([], mockModels.User)).to.throw(
        "cannot pass an array as a parameter"
      );
    });

    it("called app.createOne with missing required field", () => {
      return app.createOne(invalidUser, mockModels.User).catch(res => {
        expect(res.message).to.equal("Error while creating user!");
      });
    });
  });

  context("user exists", () => {
    before(async () => {
      User.findOne.withArgs({ where: { id: validUser.id } }).resolves({
        type: "success",
        message: "User data extracted!",
        result: {
          id: validUser.id,
          personalIdentityNumber: validUser.personalIdentityNumber,
          firstName: validUser.firstname,
          lastName: validUser.lastname,
          isRegistred: validUser.isRegistered,
          updatedAt: new Date(),
          createdAt: new Date()
        }
      });

      User.findOne.withArgs({ where: { id: missingUser.id } }).resolves(0);
    });

    it("called app.findOne", () => {
      return app.findOne({ id: validUser.id }, mockModels.User).then(res => {
        expect(res).to.be.ok;
        expect(res.message).to.equal("User data extracted!");
      });
    });

    it("called app.findOne with invalid argument", () => {
      expect(() => app.findOne([], mockModels.User)).to.throw(
        "cannot pass an array as a parameter"
      );
    });

    it("called app.findOne with a user that does not exist", () => {
      return app.findOne({ id: missingUser.id }, mockModels.User).catch(res => {
        expect(parseInt(res.message)).to.equal(0);
      });
    });
  });

  context("user update", () => {
    before(async () => {
      User.update.resolves({
        type: "success",
        message: "User updated!",
        result: {
          id: validUser.id,
          personalIdentityNumber: validUser.personalIdentityNumber,
          firstName: validUser.firstname,
          lastName: validUser.lastname,
          isRegistred: validUser.isRegistered,
          updatedAt: new Date(),
          createdAt: new Date()
        }
      });
    });

    it("called app.updateOne", () => {
      return app.updateOne(1, validUser, mockModels.User).then(res => {
        expect(res).to.be.ok;
        expect(res.message).to.equal("User updated!");
      });
    });
  });

  context("user delete", () => {
    before(async () => {
      User.destroy.resolves({
        type: "success",
        message: "User deleted!",
        result: {
          id: validUser.id,
          personalIdentityNumber: validUser.personalIdentityNumber,
          firstName: validUser.firstname,
          lastName: validUser.lastname,
          isRegistred: validUser.isRegistered,
          updatedAt: new Date(),
          createdAt: new Date()
        }
      });
    });

    it("called app.deleteOne", () => {
      return app.deleteOne(validUser, mockModels.User).then(res => {
        expect(res).to.be.ok;
        expect(res.message).to.equal("User deleted!");
      });
    });
  });
});
