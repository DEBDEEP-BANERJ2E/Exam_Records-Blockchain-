const { Record } = require('../models/Record');

// Verify a record
exports.verifyRecord = async (req, res) => {
    try {
        const recordId = req.params.id;

        const record = await Record.findByPk(recordId);
        if (!record) return res.status(404).json({ message: 'Record not found.' });

        record.verified = true;
        await record.save();

        res.status(200).json({ message: 'Record verified successfully', record });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying record.', error });
    }
};
