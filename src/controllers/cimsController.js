const compModal = require("../models/compSchema");
const { cimsSchema } = require("../schema/cimsSchema");
const { customResponse } = require("../utility/helper");

const cimsGet = async (req, res) => {
    // const {designation, brandname, clientname, domain, baselocation, companyaddress, contacts }=req.body

    try {
        const Comps = await compModal.find({});
        data = Comps
        code = 200
        message = "Data fetched successfully"

        const resData = customResponse({
            data,
            code,
            message
        })
        res.send(resData);

    } catch (error) {
        res.status(402).send(error);
    }
};
//
const cimsPost = async (req, res) => {
    const { designation, brandname, clientname, domain, baselocation, pincode, country, state, district, city, addressLine1, addressLine2, landmark, contacts } = req.body.formData
    //console.log({designation, brandname, clientname, domain, baselocation,pincode,country,state,district,city,addressLine1,addressLine2,landmark,contacts})
    try {
        const { error } = cimsSchema.validate(req.body.formData);
        //console.log(error)
        if (error) {
            code = 422;
            message = "Invalid request data";
            const resData = customResponse({
                code,
                message,
                err: error && error.details,
            });
            return res.status(code).send(resData);

            //return res.status(code).send(error);
        }
        const newComp = await compModal.create({ designation, brandname, clientname, domain, baselocation, pincode, country, state, district, city, addressLine1, addressLine2, landmark, contacts })
        res.json(newComp)
        console.log("created successfully..", newComp)
    }
    catch (err) {
        console.log(err)
    }
};

const cimsDel = async (req, res) => {
    const { id } = req.params;
    try {
        const del = await compModal.findById(id);
        await del.remove();
        res.json("deleted successfully")
    } catch (error) {
        res.status(500).send(error)
    }
};
//
const cimsPatch = async (req, res) => {
    const { id } = req.query;
    const { designation, brandname, clientname, domain, baselocation, pincode, country, state, district, city, addressLine1, addressLine2, landmark, contacts } = req.body;
   try {
       const { error } = updateSchema.validate(req.body);
               if (error) {
            code = 422;
            message = "Invalid request data";
            const resData = customResponse({
                code,
                message,
                err: error && error.details,
            });
            return res.status(code).send(resData);

            //return res.status(code).send(error);
        }
        const update = await compModal.findOneAndUpdate({ _id: id }, {
            designation: designation, brandname: brandname, clientname: clientname, domain: domain, baselocation: baselocation,
            pincode: pincode, country: country, state: state, district: district, city: city, addressLine1: addressLine1, addressLine2: addressLine2, landmark: landmark, contacts: contacts
        });
        res.json(update)
    }
    catch (error) {
        console.log(error.message)
    }
};
module.exports = { cimsDel, cimsGet, cimsPatch, cimsPost };
