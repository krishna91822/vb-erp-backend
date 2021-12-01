const express = require("express");
const router = express.Router();

const {
    createPoSow,
    getPoSowList,
    getPoDeatil,
    getSortedPoList,
} = require("../controllers/poSowController");


router.post("/", createPoSow);
router.get("/", getPoSowList);
router.get("/:id", getPoDeatil)
router.get("/sort/:fieldName", getSortedPoList)


module.exports = router;
