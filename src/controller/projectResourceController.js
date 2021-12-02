const { json } = require("body-parser");
const ProjectAndResource = require("../models/projectAndResource_Model");

app.get('/userProject', async(req, res) => {

    try {
        const projectDetails = await ProjectAndResource.find({
            resourceId: req.body.userId,
            projectId: req.body.projectId
        }).populate({
            path: 'resourceId',
            select: 'associateName'
        })
        return res.status(200).json(projectDetails)
    } catch (error) {
        throw error
    }
});