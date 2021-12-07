const compModal = require("../models/compSchema");
const { cimsSchema, updateSchema } = require("../schema/cimsSchema");
const { rewardSchema } = require("../schema/rewardSchema");
const { customResponse } = require("../utility/helper");



const getbystatus = async(req,res)=>{
    const {status} = req.headers
   
 compModal.find({status:[status]}).then(clientData=>res.send(clientData))
//compModal.find({status:{$eq:status}}).then(clientData=>res.send(clientData))

}

//Get all records in database
const cimsGet = async (req, res) => {

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

        code = 422;

        const resData = customResponse({
            code,
            error: error && error.details
        });
        return res.send(resData);
    }
};

//Post record in database
const cimsPost = async (req, res) => {
    
    try {
        const { error } = cimsSchema.validate(req.body);

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
        const newComp = await compModal.create({ designation, brandname, clientname, domain, status,gstnumber,pannumber,baselocation, address, contacts })
        
        data = newComp
        code = 200
        message = "Data created successfully"

        const resData = customResponse({
            data,
            code,
            message
        })
        res.send(resData);
    }
    catch (err) {

        code = 422;
        const resData = customResponse({
            code,
            error: error && error.details
        });
        return res.send(resData);
    }
};

//Delete record in database
const cimsDel = async (req, res) => {

    const { id } = req.query;
    
    try {
        const del = await compModal.findById(id);
        await del.remove();

        code = 200;
        message = "Data deleted successfully"

        const resData = customResponse({
            code,
            message,
            error
        });
        res.send(resData)
    } catch (error) {

        code = 422;
        data = req.body

        const resData = customResponse({
            code,
            message,
            error: error && error.details
        });
        return res.send(resData);
    }
};

//Update record in database
const cimsPatch = async (req, res) => {

    const _id = req.body._id;
    const { designation, brandname, clientname, domain, baselocation,address, status,contacts } = req.body;
    
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
            return res.send(resData);

        }

        const update = await compModal.findOneAndUpdate({ _id: _id }, {
            designation: designation, brandname: brandname, clientname: clientname, domain: domain, baselocation: baselocation,status:status,
           address:address, contacts: contacts
        });

        code = 200;
        data = req.body
        message = "Data updated successfully";

        const resData = customResponse({
            code,
            message,
            data
        });
        return res.send(resData);
    }
    catch (error) {

        code = 422;

        const resData = customResponse({
            code,
            message,
            error: error && error.details
        });
        res.send(resData)
    }
};

module.exports = { cimsDel, cimsGet, cimsPatch, cimsPost ,getbystatus}
