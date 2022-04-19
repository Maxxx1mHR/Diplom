const Sequelize = require('sequelize')

module.exports = function (sequelize){
return sequelize.define(
    'Staff',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        family_name: {
            type: Sequelize.CHAR,
            allowNull: false
        },
        name: {
            type: Sequelize.CHAR,
            allowNull: false
        },
        dad_name: {
            type: Sequelize.CHAR,
            allowNull: false
        },
        id_department: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_rnu: {
            type: Sequelize.INTEGER,
            allowNull: false
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