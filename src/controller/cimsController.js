const compModal = require("../models/compSchema");
const { cimsSchema, updateSchema } = require("../schema/cimsSchema");
const { customResponse } = require("../utility/helper");

//get by status
const getbystatus = async(req, res) => {
    const { status } = req.headers;

    compModal
        .find({ status: [status] })
        .then((clientData) => res.send(clientData));
};

//Get all records in database
const cimsGet = async(req, res) => {
    try {
        const sort = req.query.sort;
        const filter = req.query.filter;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const Comps = await compModal
            .find(filter == "" || !filter ? {} : { status: [filter] })
            .collation({ locale: "en" })
            .sort(
                sort == "" || !sort ?
                {} :
                {
                    [sort.replace(/['"]+/g, "")]: 1,
                }
            );

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const count = await compModal
            .find(filter == "" || !filter ? {} : { status: [filter] })
            .collation({ locale: "en" })
            .sort(
                sort == "" || !sort ?
                {} :
                {
                    [sort.replace(/['"]+/g, "")]: 1,
                }
            )
            .countDocuments();

        const data = {};
        data.data = Comps.slice(startIndex, endIndex);

        data.data.forEach((record, i) => {
            record.rowNumber = startIndex + i + 1;
        });

        data.totalPages = Math.ceil(count / limit);
        code = 200;
        message = "Data fetched successfully";

        const resData = customResponse({
            data,
            code,
            message,
        });
        res.send(resData);
    } catch (error) {
        code = 422;

        const resData = customResponse({
            code,
            error: error && error.details,
        });
        console, log(resData);
        return res.send(resData);
    }
};

//Post record in database
const cimsPost = async(req, res) => {
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
        const newComp = await compModal.create(req.body);

        data = newComp;
        code = 200;
        message = "Data created successfully";

        const resData = customResponse({
            data,
            code,
            message,
        });
        res.send(resData);
    } catch (err) {
        code = 422;
        const resData = customResponse({
            code,
            error: error && error.details,
        });
        return res.send(resData);
    }
};

//Delete record in database
const cimsDel = async(req, res) => {
    const { id } = req.query;

    try {
        const del = await compModal.findById(id);
        await del.remove();

        code = 200;
        message = "Data deleted successfully";

        const resData = customResponse({
            code,
            message,
            error,
        });
        res.send(resData);
    } catch (error) {
        code = 422;
        data = req.body;

        const resData = customResponse({
            code,
            message,
            error: error && error.details,
        });
        return res.send(resData);
    }
};

//Update record in database
const cimsPatch = async(req, res) => {
    const _id = req.body._id;
    //const { designation, brandname, clientname, domain, baselocation,address, status,contacts } = req.body;

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

        await compModal.findOneAndUpdate({ _id: _id }, req.body);

        code = 200;
        data = req.body;
        message = "Data updated successfully";

        const resData = customResponse({
            code,
            message,
            data,
        });
        return res.send(resData);
    } catch (error) {
        code = 422;

        const resData = customResponse({
            code,
            error: error && error.details,
        });
        res.send(resData);
    }
};

/* ****************************************** */
// PMO integration functionality

const getFilteredClients = async(req, res) => {
    const query = req.query;
    try {
        if (Object.keys(req.query).length === 0) {
            const client = await compModal.find({}, { brandName: 1, "contacts.primaryContact.contactNumber": 1 });
            return res.status(200).send(client);
        } else {
            const client = await compModal.find({
                $or: [{
                    brandName: {
                        $regex: query.brandName.trim(),
                        $options: "i",
                    },
                }, ],
            }, { brandName: 1, "contacts.primaryContact.contactNumber": 1 });
            return res.status(200).send(client);
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    cimsDel,
    cimsGet,
    cimsPatch,
    cimsPost,
    getbystatus,
    getFilteredClients,
};