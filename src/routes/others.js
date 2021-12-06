const express=require("express");
const router = express.Router()
const{duplicates, getLocation, getCountriesList, getclientinfo, getRecords} = require("../controllers/othersController")

//router.post('/login', postLogin)

router.get('/location', getLocation)
router.get('/countries', getCountriesList)
router.get('/getclientinfo', getclientinfo)
router.get('/duplicates', duplicates)
router.get('/sort', getRecords)

module.exports = router