import mongoose from 'mongoose'

const connectDb = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log("💚DB connected successfully")
    }catch(error){
       console.log('Error in db connection',error)
    }
}

export default connectDb