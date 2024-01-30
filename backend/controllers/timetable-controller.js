const Timetable = require('../models/timetableSchema.js');
// router.post('/TimetableCreate',upload.single('file'), timetableCreate);
const timetableCreate = async (req, res) => {
    try {
        console.log(req.file);
        const filePath=req.file.path;
        const fileName=req.file.originalname;
        const fileType=req.file.mimetype;
        const fileSize=req.file.size;


        const timetable = new Timetable({
            filePath: filePath,
            fileName: fileName,
            fileType: fileType,
            fileSize: fileSize,
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
        
        const timetables = await Timetable.find({school: req.params.id});
        console.log(timetables);
        res.send(timetables);
    } catch (error) {
        res.status(500).json(error);
    }
}
const getTimetable = async (req, res) => {
    try {
        const timetable = await Timetable.findById(req.params.id);
        res.download(`${__dirname}/../${timetable.filePath}`);
    } catch (error) {
        res.status(500).json(error);
    }
};


const deleteTimetable = async (req, res) => {
    try {
        const result = await Timetable.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = { timetableCreate, timetableList,  deleteTimetable,getTimetable};
