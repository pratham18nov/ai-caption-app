const userModel = require('../../models/userModel')

async function updateUserController(req, res){
    try {
        const {userId, profilePic, firstName, lastName, facebookUrl, instagramUrl, twitterUrl} = req.body
        if(!firstName) throw new Error("firstName not received")
        if(!lastName) throw new Error("lastName not received")
        
        const update = await userModel.findByIdAndUpdate(
            userId, 
            { profilePic, firstName, lastName, facebookUrl, instagramUrl, twitterUrl },
            { new: true }
        )

        res.status(200).json({
            message: "User data updated successfully",
            data: update,
            success: true, 
            error: false
        })
        
    } catch (err) {
        res.json({
            message:err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = updateUserController