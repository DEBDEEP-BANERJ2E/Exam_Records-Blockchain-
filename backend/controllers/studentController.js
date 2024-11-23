const User = require('../models/User');
const Record = require('../models/Record');

exports.getStudentRecords = async (req, res) => {
    try {
        const records = await Record.findAll({ where: { userId: req.user.id } });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
