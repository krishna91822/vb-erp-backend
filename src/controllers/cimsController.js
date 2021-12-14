const compModal = require("../models/compSchema");
const { cimsSchema, updateSchema } = require("../schema/cimsSchema");
const { customResponse } = require("../utility/helper");

//Get all records in database
const cimsGet = async (req, res) => {
    try {
        const sort = req.query.sort;
        const filter = req.query.filter;
        const sortOrder = req.query.sortOrder;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const Comps = await compModal
            .find(filter == "" || !filter ? {} : { status: [parseInt(filter)] })
            .collation({ locale: "en" })
            .sort(
                sort == "" || !sort ? {} : { [sort.replace(/['"]+/g, "")]: sortOrder }
            );

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const count = Comps.length

        const totalPages = Math.ceil(count / limit);
        const data = {};
        data.data = Comps.slice(startIndex, endIndex);
        data.data.forEach((record, i) => {
            record.rowNumber = startIndex + i + 1;
        });

        if (data.data.length == 0) {
            const startIndex = (totalPages - 1) * limit;
            const endIndex = totalPages * limit;
            data.data = Comps.slice(startIndex, endIndex);
            data.data.forEach((record, i) => {
                record.rowNumber = startIndex + i + 1;
            });
        }

        data.totalPages = totalPages;
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

    } catch (error) {
        code = 422;
        const resData = customResponse({
            code,
            error: error && error.details,
        });
        return res.send(resData);
    }
};

//Delete record in database
const setStatus = async (req, res) => {
    const { id, brandName } = req.query;
    const status = req.query.status

    try {
        await compModal.findOneAndUpdate({ _id: id }, { status: !status });

        code = 200;
        clientStatus
            ? (message = `The client ${brandName} has been Deactivated`)
            : (message = `The client ${brandName} has been Reactivated`);

        const resData = customResponse({
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
        return res.send(resData);
    }
};

//Update record in database
const cimsPatch = async (req, res) => {
    const _id = req.body._id;

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

//Searching the records
const searchRecords = async (req, res) => {
    try {
        const searchData = req.query.searchData;
        let regex = new RegExp(searchData, "i");

        const records = await compModal.find({
            $or: [
                { brandName: [regex] },
                { "registeredAddress.country": [regex] },
                { "contacts.primaryContact.firstName": [regex] },
            ],
        });

        const data = records;

        if (data.length == 0) {
            code = 422;
            message = `No record containing ${searchData} exists`;

            const resData = customResponse({
                code,
                data,
                message,
                err: [{
                    message
                }]
            });

            res.send(resData);
        }

        else {
            data.forEach((record, i) => {
                record.rowNumber = i + 1;
            });

            code = 200;
            message = "Data fetched successfully";

            const resData = customResponse({
                code,
                data,
                message
            });

            res.send(resData);
        }
    } catch (err) {
        code = 422;
        const resData = customResponse({
            code,
            error: err && err.details,
        });

        res.send(resData);
    }
};

module.exports = { searchRecords, setStatus, cimsGet, cimsPatch, cimsPost };
