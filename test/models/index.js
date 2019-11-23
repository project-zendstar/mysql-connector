const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { dbName, dbUser, dbPass, options } = require("../config.json");
const basename = path.basename(module.filename);
const sequelize = new Sequelize(dbName, dbUser, dbPass, options);
const db = { Sequelize, sequelize };


const onlyModels = file =>
  file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";


const importModel = file => {
  const modelPath = path.join(__dirname, file);
  const model = sequelize.import(modelPath);
  db[model.name] = model;
};


const associate = modelName => {
  if (typeof db[modelName].associate === "function")
    db[modelName].associate(db);
};


fs.readdirSync(__dirname)
  .filter(onlyModels)
  .forEach(importModel);
Object.keys(db).forEach(associate);


module.exports = db;
