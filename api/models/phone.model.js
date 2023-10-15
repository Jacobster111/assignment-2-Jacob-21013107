module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.INTEGER
        }
    });
  
    return Phone;
};