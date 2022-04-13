const {Sequelize, Model} = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:');

//class Staff extends Model{}


/*
const sequelize = new Sequelize(
    'diplom',
    'root',
    'root',
    {
        dialect: 'mysql',
        host: 'localhost',
        define:{
            timestamps: false
        }
    }
)

sequelize
    .authenticate()
    .then(()=> console.log('Connecnted.'))
    .catch((err)=>console.erroe('Connection error: ', err))

*/


/*
Staff.init({
    // Model attributes are defined here
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    family_name:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    name:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    dad_name:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    id_department:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    id_rnu:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    login:{
        type:Sequelize.CHAR,
        allowNull: true
    },
    password:{
        type:Sequelize.CHAR,
        allowNull: true
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Staff' // We need to choose the model name
});
*/




// the defined model is the class itself
//console.log(Staff === sequelize.models.Staff); // true

const Staff = sequelize.define(
    'Staff',
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        family_name:{
            type: Sequelize.CHAR,
            allowNull: false
        },
        name:{
            type: Sequelize.CHAR,
            allowNull: false
        },
        dad_name:{
            type: Sequelize.CHAR,
            allowNull: false
        },
        id_department:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        id_rnu:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        login:{
            type:Sequelize.CHAR,
            allowNull: true
        },
        password:{
            type:Sequelize.CHAR,
            allowNull: true
        }
    }
)

module.exports = sequelize.models.Staff // true


//module.exports = Staff;


