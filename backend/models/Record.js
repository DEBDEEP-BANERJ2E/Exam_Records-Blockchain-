const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); // Assuming the `User` model is already defined

const Record = sequelize.define('Record', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id', // Assumes 'id' is the primary key in the User table
        },
    },
    institutionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    recordData: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true, // Automatically includes createdAt and updatedAt fields
});

// Establish associations (relationships)
User.hasMany(Record, { foreignKey: 'studentId', as: 'studentRecords' });
User.hasMany(Record, { foreignKey: 'institutionId', as: 'institutionRecords' });
Record.belongsTo(User, { foreignKey: 'studentId', as: 'student' });
Record.belongsTo(User, { foreignKey: 'institutionId', as: 'institution' });

module.exports = Record;
