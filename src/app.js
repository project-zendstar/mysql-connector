const Constants = require("./constants");

function createOne(data, model) {
  if (!data || Array.isArray(data)) {
    throw new Error(Constants.SINGLE_PARAM_ERROR);
  }

  return model
    .create(data)
    .then(data => Promise.resolve(data))
    .catch(err => {
      return Promise.reject(err);
    });
}

function findOne(data, model) {
  if (!data || Array.isArray(data)) {
    throw new Error(Constants.SINGLE_PARAM_ERROR);
  }

  return model
    .findOne({ where: data })
    .then(data => {
      if (!data) {
        throw new Error(data);
      }
      return Promise.resolve(data);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function deleteOne(data, model) {
  if (!data || Array.isArray(data)) {
    return Promise.reject(Constants.SINGLE_PARAM_ERROR);
  }

  return model
    .destroy({ where: data })
    .then(data => {
      if (data == 0) {
        throw new Error(data)
      }
      return Promise.resolve(data);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function updateOne(id, data, model) {
  if (!data || Array.isArray(data)) {
    return Promise.reject(Constants.SINGLE_PARAM_ERROR);
  }
  
  return model
    .update(data, {
      where: {
        id: id
      }
    })
    .then(data => {
      if (data == 0) {
        throw new Error(data)
      }
      return Promise.resolve(data);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function updateOneAndGet(id, data, model) {
  if (!data || Array.isArray(data)) {
    return Promise.reject(Constants.SINGLE_PARAM_ERROR);
  }
  
  return model
    .update(data, {
      where: {
        id: id
      }
    })
    .then(data => {
      if (data == 0) {
        throw new Error(data)
      }
      return model.findOne({ where: {id: id} }).then((data) => {
        return Promise.resolve(data);
      })
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

module.exports = {
  createOne,
  findOne,
  updateOne,
  deleteOne,
  updateOneAndGet
};
