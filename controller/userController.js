import userSchema from "../models/userSchema.js";
import jwt  from "jsonwebtoken";

export const generateToken = (id,role) => {
  return jwt.sign({ id,role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const register = async (req, res) => {
  console.log('req.body is',req.body)
  const { name, email, password, role } = req.body;
  try {
    const existing = await userSchema.findOne({ email });
    if (existing) {
      return res
        .status(404)
        .json({
          message: "User exist by this email",
          success: false,
          code: 404,
        });
    }
    const user = await userSchema.create({ name, email, password, role });

    console.log('user saved',user)

    return res.status(200).json({
      success: true,
      userData: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id,user.role),
      },
    });
  } catch (error) {
    console.log("Error in api", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id,user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async(req,res)=>{
  try{
    const {id} = req.params

    const users = await userSchema.find({id})
    if(!users) return res.status(404).json({message:'No users found',success:false})

      return res.status(200).json({
        users
      })
  }catch(err){
    console.log('Error in get users',err)
      return res.status(500).json({message:'Error in get users api'})
  }
}

export const updateUser = async(req,res)=>{
  try{

    const {id} = req.params;

    const updatedUser =await userSchema.findByIdAndUpdate(id,req.body,{
      new:true
    })

    if(updatedUser){
      return res.status(200).json({
        user:updatedUser,
        message:'user updated successfully'
      })
    }
    return res.status(400).json({message:'Error in updating user'})
  }catch(error){
    console.log('Error in updating user',error)
    return res.status(500).json({message:'Error in update user api'})
  }
}

export const deleteUser = async(req,res)=>{
  try{
    const {id} = req.params
    
    const deletedUser = await userSchema.findByIdAndDelete(id)

    return res.json({message:"User deleted succesfully",user:deletedUser})
  }catch(error){
    console.log('Deleting error',error)
    return res.status(500).json({message:'Error in deleting user'})
  }
}