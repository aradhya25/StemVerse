const { v4: uuidv4 } = require("uuid");

const {

saveProgress,

getProgress

}=require("../models/progressModel");

exports.saveProgress=async(req,res)=>{

try{

const{

lesson_id,

watch_time,

completed

}=req.body;

const progress=await saveProgress(

uuidv4(),

req.user.id,

lesson_id,

watch_time,

completed

);

res.status(200).json({

success:true,

progress

});

}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};

exports.getMyProgress=async(req,res)=>{

try{

const progress=await getProgress(req.user.id);

res.status(200).json({

success:true,

progress

});

}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};