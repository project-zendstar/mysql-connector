'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    personalIdentityNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'personal_identity_number',
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'last_name',
    },
    street: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'street',
    },
    zipCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'zip_code',
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'city',
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'phone_number',
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'email',
    },
    isBlocked: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'is_blocked',
    },
    isRegistred: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: 'is_registred',
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'is_deleted',
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login',
    },
    lastCheck: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_check',
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'country',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};