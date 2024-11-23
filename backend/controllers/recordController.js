// recordController.js

const { Record } = require('../models/Record');

// Get all records (or modify as needed for specific retrieval)
exports.getRecords = async (req, res) => {
    try {
        const records = await Record.findAll();
        res.status(200).json({ records });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving records.', error });
    }
};

// Create a new record
exports.createRecord = async (req, res) => {
    try {
        const { studentId, institutionId, recordData } = req.body;

        const record = await Record.create({ studentId, institutionId, recordData });
        res.status(201).json({ message: 'Record created successfully', record });
    } catch (error) {
        res.status(500).json({ message: 'Error creating record.', error });
    }
};

// Update record verification status
exports.updateVerification = async (req, res) => {
    try {
        const recordId = req.params.id;
        const { verified } = req.body;

        const record = await Record.findByPk(recordId);
        if (!record) return res.status(404).json({ message: 'Record not found.' });

        record.verified = verified;
        await record.save();

        res.status(200).json({ message: 'Record updated successfully', record });
    } catch (error) {
        res.status(500).json({ message: 'Error updating record.', error });
    }
};
