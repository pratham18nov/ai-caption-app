const saveCaptionsModel = require("../../models/saveCaptionsModel");
const userModel = require("../../models/userModel");

async function saveCaptionController(req, res){
    try {
        const {caption, userId} = req.body
        if(!caption || !userId) throw new Error("Caption or userId not received")
        
        // Check if user has already liked this caption
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }

        // Find the caption in the database
        const exists = await saveCaptionsModel.findOne( {caption} )
        if (!exists) {
            return res.status(404).json({
                message: "Caption not found",
                success: false,
                error: true
            });
        }

        // Check if user has already liked this caption
        if (user.captionsLiked.includes(exists._id)) {
            return res.status(200).json({
                message: "Caption already liked by user",
                data: exists,
                success: true,
                error: false
            });
        }

        // Update the caption's like count and add user to likedUsers
        const updated = await saveCaptionsModel.findByIdAndUpdate(
            exists._id, 
            { 
                $inc: { likeCount: 1}, 
                $addToSet: {likedUsers: userId},
            },
            { new : true }
        )

        // Update user's captionsLiked array (most recent 50 only)
        await userModel.findByIdAndUpdate(userId, {
            $push: {
                captionsLiked: {
                    $each: [updated._id],
                    $position: 0,
                    $slice: 50
                }
            }
        })

        return res.status(200).json({
            message: "Caption like Count updated",
            data: updated,
            success: true,
            error: false
        })
    } 
    catch (err) {
        res.json({
            message: err.message || err, 
            error: true,
            success: false
        })
    }
}

module.exports = saveCaptionController