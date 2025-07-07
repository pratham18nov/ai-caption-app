const saveCaptionsModel = require("../../models/saveCaptionsModel");
const userModel = require("../../models/userModel");

async function saveCaptionController(req, res){
    try {
        const {caption, userId} = req.body
        if(!caption || !userId) throw new Error("Caption or userId not received")
        
        // const normalizedCaption = caption.trim().toLowerCase()

        const exists = await saveCaptionsModel.findOne( {caption} )
        if(exists){
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
        else{
            const likeCount = 0;
            
            const payload = {
                ...req.body,
                likeCount: Number(likeCount)+1,
                likedUsers: [userId]
            }

            const store = new saveCaptionsModel(payload)
            const stored = await store.save()

            // Update user's captionsLiked array (most recent 50 only)
            await userModel.findByIdAndUpdate(userId, {
                $push: {
                    captionsLiked: {
                        $each: [stored._id],
                        $position: 0,
                        $slice: 50
                    }
                }
            })

            res.status(200).json({
                message:"Caption stored",
                data: stored,
                success: true,
                error: false
            })
        }
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