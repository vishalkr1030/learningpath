const courseSchema = require('../models/course');

exports.getCourses = async (req, res) => {
    try {
        // console.log('hii')
        const getCoursesData = await courseSchema.find({});
        // console.log(getCoursesData);
        // (getCoursesData);
        res.status(200).send(JSON.stringify(getCoursesData));
    } catch (error) {
        res.status(500).send(error);
    }
};


// exports.postCourses = async (req, res) => {
//     console.log(req.body);
//     try {
//         // console.log(req);
//         // const getUsersDataEmail = await courseSchema.findOne({email : req.body.email});
//         // if (getUsersDataEmail === null) {
//             const getUsersData = new courseSchema(req.body);
//             console.log(getUsersData);
//             await getUsersData.save();
//             res.status(200).send("true");
//         }
//         // else {
//         //     res.status(400).send("email already exists");
//         //     console.log("email exists");
//         // }
//     // }
//      catch (error) {
//         res.status(500).send("tring to connect db but cannot do because of internal error");
//     }
// };