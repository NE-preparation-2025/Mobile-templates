const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    'supamenu_db',
    'postgres',
    'irisa'
    , {
        host: 'localhost',
        dialect: 'postgres',
        logging: true,
    })

module.exports = sequelize 