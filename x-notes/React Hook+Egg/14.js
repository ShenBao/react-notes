// user.js

module.exports = app => {
  const {STRING, INTEGER, TEXT, DATE} = app.Sequelize;

  const User = app.model.define ('user', {
    id: {
      type: STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    username: STRING (20),
    password: STRING (64),
  });

  User.associate = function () {
    // 与 userDetail 存在一对一关系，所以是 hasOne()
    app.model.User.hasOne (app.model.UserDetail, {
      foreignKey: 'userId',
    });

    // 与 comment 存在一对多关系，所以使用 hasMany()
    app.model.User.hasMany (app.model.Comment, {
      foreignKey: 'userId',
      targetKey: 'id',
    });

    // 与 roles 存在多对多关系，使用 belongsToMany()
    app.model.User.belongsToMany (app.model.Roles, {
      through: app.model.UserRoles, // 通过那张中间表进行关联
      foreignKey: 'userId',
      otherKey: 'rolesId',
    });
  };

  return User;
};

// comment.js

module.exports = app => {
  const {STRING, INTEGER, TEXT, DATE} = app.Sequelize;

  const Comment = app.model.define ('comment', {
    id: {
      type: STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: INTEGER,
    msg: STRING (500),
  });

  // 关联查询
  Comment.associate = () => {
    // 与 user 存在多对一关系，所以使用 belongsTo()
    app.model.Comment.belongsTo (app.model.User, {
      foreignKey: 'userId',
    });
  };

  return Comment;
};

// userDetail.js
module.exports = app => {
  const {STRING, INTEGER, TEXT, DATE} = app.Sequelize;

  const UserDetail = app.model.define ('userDetail', {
    id: {
      type: STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: INTEGER,
    age: INTEGER,
    addr: STRING (120),
    avatar: STRING (1100),
  });

  UserDetail.associate = () => {};

  return UserDetail;
};

// roles.js
module.exports = app => {
  const {STRING, INTEGER, TEXT, DATE} = app.Sequelize;

  const Roles = app.model.define ('roles', {
    id: {
      type: STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING (50),
  });

  Roles.associate = () => {
    // 与 user 表是多对多关系
    app.model.Roles.belongsToMany (app.model.User, {
      through: app.model.UserRoles,
      foreignKey: 'rolesId',
      otherKey: 'userId',
    });
  };

  return Roles;
};

// userRoles.js
module.exports = app => {
  const {STRING, INTEGER, TEXT, DATE} = app.Sequelize;

  const UserRoles = app.model.define ('userRoles', {
    userId: INTEGER,
    rolesId: INTEGER,
  });

  return UserRoles;
};
