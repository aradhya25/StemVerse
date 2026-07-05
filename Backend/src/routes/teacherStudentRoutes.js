const router=require("express").Router();

const authMiddleware=require("../middleware/authMiddleware");

const roleMiddleware=require("../middleware/roleMiddleware");

const {

    getStudents,

}=require("../controllers/teacherStudentController");

router.get(

    "/",

    authMiddleware,

    roleMiddleware("teacher"),

    getStudents

);

module.exports=router;