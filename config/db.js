const mongoose=require('mongoose');

const connectDB=()=>{
    mongoose.connect('mongodb://localhost:27017/userDatabase')
    .then(()=>{
        console.log('Database Connected')
    })
    .catch((err)=>{
        console.log('DB connection error',err);
    })
}

module.exports=connectDB;