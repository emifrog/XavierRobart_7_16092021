module.exports = {
    HOST: "localhost",
    USER: "student",
    PASSWORD: "pablito",
    DB: "groupomania",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };