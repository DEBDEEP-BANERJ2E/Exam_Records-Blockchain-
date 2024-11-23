const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BlockchainLog = sequelize.define('BlockchainLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    transactionHash: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.JSON, allowNull: false },
}, {
    timestamps: true,
});

module.exports = BlockchainLog;
