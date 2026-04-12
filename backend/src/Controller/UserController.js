const UserSchema = require('../Model/UserModel')
const bcrypt = require('bcrypt')


const getData = async(req,resp) => {
    try{
        const data = await UserSchema.find()
        resp.status(200).json({
            message : "Data Fetch Successfully",
            data : data
        })
    }catch(err){
        resp.status(500).json({message : err.message})
    }
}

const register = async(req,resp) => {
    try{
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return resp.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const data = new UserSchema({
            name,
            email,
            password: hashedPassword
        });

        await data.save();
        resp.status(201).json({
            message: "User Registered Successfully",
            data: data
        });
    }catch(err){
        resp.status(500).json({message : err.message})
    }
}

const login = async(req,resp) => {
    try{
        const { email, password } = req.body;
        const data = await UserSchema.findOne({ email });
        
        if(data){
            // Compare password
            const isMatch = await bcrypt.compare(password, data.password);
            if (isMatch) {
                resp.status(200).json({
                    message : "Login Successfully",
                    data : data
                })
            } else {
                resp.status(401).json({ message: "Invalid Credentials" });
            }
        }else{
            resp.status(404).json({message : "User Not Found"})
        }
    }catch(err){
        resp.status(500).json({message : err.message})
    }
}


module.exports = {getData, register, updateData, login}