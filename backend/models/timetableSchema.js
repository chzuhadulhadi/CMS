const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    uploadTime: {
        type: Date,
        default: Date.now,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School', 
        required: true,
    },
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
