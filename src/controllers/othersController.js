const countries = require('country-state-picker');
const fetch = require('node-fetch')
const { locationSchema } = require('../schema/cimsSchema')
const { customResponse } = require("../utility/helper");
const jwt = require('jsonwebtoken');
const { custom } = require('joi');
const compModal = require("../models/compSchema");

const TOKEN_SECRET = '6850cc6ab29180f03f647c9b7ff331298038b2cd9bf71980f87bfd547e0da37ac60c4c5d7f7136f81b81496a741f496ea3e528b70755bcf020874e0ef01446db'

//Token creation
const postLogin = (req, res) => {

    const username = req.body.username
    var user = { name: username }

    if (username == null) user = { name: "Dummy username" }

    const token = jwt.sign(user, TOKEN_SECRET, { expiresIn: '3600s' })
    res.json({ Token: token })
}

//Get location from pincode and country
const getLocation = async (req, res) => {

    const pincode = req.headers.pincode
    const country = req.headers.country
    const { error } = locationSchema.validate(req.headers)

    if (error) {

        code = 422;
        message = "Invalid request data";
        const resData = customResponse({
            code,
            message,
            err: error && error.details,
        });
        return res.send(resData);
    }

    const url = `https://api.worldpostallocations.com/pincode?postalcode=${pincode}&countrycode=${country}`
    const fetch_res = await fetch(url)

    const location = await fetch_res.json()

    try {
        const state = location.result[0].state
        const districts = location.result.reduce(function (res, curr) {
            res[curr.district] = res[curr.district] || []
            res[curr.district].push(curr.postalLocation)
            return res
        }, {})

        const locs = new Object({
            state,
            districts
        })

        code = 200,
            data = locs,
            message = "Data fetched successfully"
        const resData = customResponse({
            code,
            data,
            message,
            code
        })
        res.send(resData)
    } catch (err) {

        code = 422;
        message = "The pincode doesnt exist"
        const resData = customResponse({
            code,
            message,
            err: [{
                message
            }],
        });
        return res.send(resData);
    }

}

//Get all countries for dropdown
const getCountriesList = async (req, res) => {

    const countriesList = countries.getCountries()

    code = 200
    data = countriesList
    message = "Data fetched successfully"
    const resData = customResponse({
        code,
        data,
        message
    })
    res.send(resData)
}

//Get client info with some id
const getclientinfo = async (req, res) => {

    try {
        const clientId = req.headers['id']
        const Comps = await compModal.find({ _id: clientId });

        code = 200
        data = Comps
        message = "Data fetched successfully"
        const resData = customResponse({
            code,
            data,
            message
        })
        res.send(resData)

    } catch (error) {

        code = 422
        message = "No record with this id found"
        const resData = customResponse({
            code,
            message,
            err: [{
                message
            }],
        })
        res.send(resData)
    }
}

//Check if record with same brandname already exists
const duplicates = async (req, res) => {
    var brandname = req.headers.brandname.replace(/\s+/g, ' ').trim()
    var id = req.headers.id
    try {
        if (!id) {
            compModal.findOne({ brandName: { $regex: new RegExp(`^${brandname}$`, "i") } }, function (err, example) {

                if (err) {

                    code = 422;
                    const resData = customResponse({
                        code,
                        message,
                        err: err && err.details,
                    });
                    return res.send(resData);
                }
                if (example) {

                    code = 422;
                    message = "Data with this brand name aready exists";
                    const resData = customResponse({
                        code,
                        message,
                        err: [{
                            message
                        }],
                    });
                    return res.send(resData);
                } else {

                    code = 200;
                    message = "Data is unique";
                    const resData = customResponse({
                        code,
                        message,
                        err,
                    });
                    res.send(resData)
                }

            });
        }
        else {

            const record1 = await compModal.find({ _id: id })
            const record2 = await compModal.find({ brandName: new RegExp(`^${brandname}$`, "i") })

            if (typeof record2[0] === 'undefined' || record1[0]._id.equals(record2[0]._id)) {
                code = 200;
                message = "Data is unique";
                const resData = customResponse({
                    code,
                    message
                });
                res.send(resData)
            }
            else {
                code = 422;
                message = "Data with this brand name aready exists";
                const resData = customResponse({
                    code,
                    message,
                    err: [{
                        message
                    }],
                });
                return res.send(resData);

            }
        }
    } catch (err) {

        code = 422;
        const resData = customResponse({
            code,
            err: err && err.details
        });
        return res.send(resData);
    }
}




module.exports = { duplicates, postLogin, getLocation, getCountriesList, getclientinfo }