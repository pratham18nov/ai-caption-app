const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function loginController(req, res){
    try {
        const {email, password} = req.body
        if(!email) throw new Error("Please provide email")
        if(!password) throw new Error("Please provide password")

        const user = await userModel.findOne({email})
        if(!user) throw new Error("User does not exist")

        const checkPassword = await bcrypt.compare(password, user.password)

        if(checkPassword){
            const tokenData = {
                userId: user._id,
                // firstName: user.firstName,
                // lastName: user.lastName,
                // email: user.email,
                // profilePic: user.profilePic  //makes the token too large 
            }
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60*60*24*7})

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: "Strict"
            }

            res.cookie("token", token, tokenOption).json({
                message: "Login successful",
                data: token,
                user:{
                    userId:user._id,
                    
                },
                success: true,
                error: false
            })
        }
        else{
            throw new Error("Incorrect password, please try again")
        }
    } 
    catch (err) {
        res.json({
            error: true, 
            success: false,
            message: err.message || err
        })
    }
}

module.exports = loginController