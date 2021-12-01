const express = require("express");
const router = express.Router();

const {
    createAssignee,
    getAssigneeList,
    updateDetails,
    unassignEmployee
} = require("../controllers/assigneeController");


router.post("/", createAssignee);
router.get("/:id", getAssigneeList)
router.patch("/:id", updateDetails)
router.patch("/unassign/:id", unassignEmployee)


module.exports = router;
