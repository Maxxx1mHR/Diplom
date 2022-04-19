const Sequelize = require('sequelize')

const sequelize = new Sequelize('diplom','root','root',{
    host: 'localhost',
    dialect: 'mysql',
})

const Staff = require('./Staff')(sequelize)

module.exports = {
    sequelize : sequelize,
    Staff : Staff
}