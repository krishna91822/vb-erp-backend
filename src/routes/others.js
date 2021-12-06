const express=require("express");
const router = express.Router()
const{duplicates, getLocation, getCountriesList, getclientinfo, getRecords, searchRecords} = require("../controllers/othersController")

//router.post('/login', postLogin)

router.get('/location', getLocation)
router.get('/countries', getCountriesList)
router.get('/getclientinfo', getclientinfo)
router.get('/duplicates', duplicates)
router.get('/sort', getRecords)
router.get('/search', searchRecords)

module.exports = router