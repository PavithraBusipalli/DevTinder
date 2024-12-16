const express = require('express');
const router = express.Router();

const {User} = require('../models/user');
const {userAuth} = require('../middleware/auth');
const { connectionRequest } = require('../models/connectionRequest');

router.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
           const fromUserId = req.user._id;
           const toUserId = req.params.toUserId;
           const status = req.params.status;
           // Handling invalid status types    
           const allowedTypes = ["interested", "ignore"];
           if(!allowedTypes.includes(status)) {
            return res.status(400).json({
                message: "Invalid Status Code..!"
            })
           }
           // If requests to non existing userId
           const toUser = await User.findById(toUserId);
           if(!toUser) {
            return res.status(404).json({
                message: "User not found!"
            })
           }

           // If there is an existing connectionRequest, check it to avoid api request for sending..!
           const existingConnReq = await connectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                { fromUserId: toUserId, toUserId: fromUserId},
            ],
           });
           if(existingConnReq) {
            return res.status(400).send({message: "Connection Request already exists!!"});
           }
           
           const connectionRequestData = new connectionRequest({
            fromUserId,
            toUserId,
            status,
           });
           const data = await connectionRequestData.save();
           res.json({
            message: "Connection Request sent successfully!",
            data,
           })
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = {
    requestRouter: router,
}