const saveCaptionsModel = require("../../models/saveCaptionsModel");

async function saveCaptionController(req, res){
    try {
        const {caption} = req.body
        if(!caption) throw new Error("Caption not received")

        const exists = await saveCaptionsModel.findOne({caption})
        if(exists){
            const updated = await saveCaptionsModel.findByIdAndUpdate(
                exists._id, 
                { $inc: { likeCount: 1} },
                { new : true }
            )

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
                likeCount: Number(likeCount)+1
            }

            const store = new saveCaptionsModel(payload)
            const stored = await store.save()

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