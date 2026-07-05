const {

    getTeacherStudents,

}=require("../models/teacherStudentModel");

exports.getStudents=async(req,res)=>{

    try{

        const students=await getTeacherStudents();

        res.json({

            success:true,

            students

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};