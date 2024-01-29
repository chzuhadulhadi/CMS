const Timetable = require('../models/timetableSchema.js');

const timetableCreate = async (req, res) => {
    try {
        const timetable = new Timetable({
            ...req.body,
            school: req.body.adminID
        });
        const result = await timetable.save();
        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const timetableList = async (req, res) => {
    try {
        
        const timetables = await Timetable.find().populate('school');

        res.send(timetables);
    } catch (error) {
        res.status(500).json(error);
    }
}


const deleteTimetable = async (req, res) => {
    try {
        const result = await Timetable.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = { timetableCreate, timetableList,  deleteTimetable};
