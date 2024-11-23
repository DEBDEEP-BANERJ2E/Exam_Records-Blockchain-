const { User } = require('../models/User');
const { Record } = require('../models/Record');

// Get all institutions
exports.getAllInstitutions = async (req, res) => {
    try {
        const institutions = await User.findAll({ where: { role: 'institution' } });
        res.status(200).json({ institutions });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving institutions.', error });
    }
};

// Get records associated with a specific institution
exports.getInstitutionRecords = async (req, res) => {
    try {
        const institutionId = req.params.id;
        const records = await Record.findAll({
            where: { institutionId },
            include: ['student'],
        });
        res.status(200).json({ records });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving institution records.', error });
    }
};

// Create a new record for an institution
exports.createRecord = async (req, res) => {
    try {
        const { institutionId, studentId, data } = req.body;

        // Verify the institution exists
        const institution = await User.findByPk(institutionId);
        if (!institution || institution.role !== 'institution') {
            return res.status(404).json({ message: 'Institution not found or invalid role.' });
        }

        // Create a new record
        const newRecord = await Record.create({
            institutionId,
            studentId,
            data,
        });

        res.status(201).json({ message: 'Record created successfully.', record: newRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error creating record.', error });
    }
};
