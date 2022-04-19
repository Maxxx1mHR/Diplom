const Sequelize = require('sequelize')

module.exports = function (sequelize){
return sequelize.define(
    'Staff',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        family_name: {
            type: Sequelize.CHAR,
            allowNull: true
        },
        name: {
            type: Sequelize.CHAR,
            allowNull: true
        },
        dad_name: {
            type: Sequelize.CHAR,
            allowNull: true
        },
        id_department: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        id_rnu: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        login: {
            type: Sequelize.CHAR,
            allowNull: true
        },
        password: {
            type: Sequelize.CHAR,
            allowNull: true
        }
    }, {
        timestamps: false
    }
)}