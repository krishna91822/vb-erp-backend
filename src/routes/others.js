const express=require("express");
const router = express.Router()
const{duplicates, getLocation, getCountriesList, getclientinfo} = require("../controllers/othersController")

//router.post('/login', postLogin)

router.get('/location', getLocation)
router.get('/countries', getCountriesList)
router.get('/getclientinfo', getclientinfo)
router.get('/duplicates', duplicates)

module.exports = router