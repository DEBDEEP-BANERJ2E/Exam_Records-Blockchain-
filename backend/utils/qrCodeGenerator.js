const QRCode = require('qrcode');

exports.generateQRCode = async (text) => {
    try {
        return await QRCode.toDataURL(text);
    } catch (err) {
        console.error('Error generating QR Code:', err.message);
    }
};
