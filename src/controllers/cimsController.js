const compModal = require("../models/compSchema");
const { cimsSchema, updateSchema } = require("../schema/cimsSchema");
const { customResponse } = require("../utility/helper");

//get by status
const getbystatus = async (req, res) => {
<<<<<<< HEAD
  const { status } = req.headers;
=======
    const { status } = req.headers

    compModal.find({ status: [status] }).then(clientData => res.send(clientData))

>>>>>>> 955a9daa24a5c368ef4909de23f09e760f7febb2

  compModal
    .find({ status: [status] })
    .then((clientData) => res.send(clientData));
};

//Get all records in database
const cimsGet = async (req, res) => {
<<<<<<< HEAD
  try {
    const data = await compModal.find({});
    // const page = parseInt(req.query.page);
    // const limit = parseInt(req.query.limit);

    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // const count = await compModal.find().countDocuments();

    // const data = {};
    // data.data = Comps.slice(startIndex, endIndex);

    // data.data.forEach((record, i) => {
    //   record.rowNumber = startIndex + i + 1;
    // });

    // data.totalPages = Math.ceil(count / limit);

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
=======

    try {
        const sort = req.query.sort
        const filter = (req.query.filter)
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const Comps = await compModal.find(filter == '' || !filter ? {} : { status: [filter] }).collation({ 'locale': 'en' }).sort(sort == '' || !sort ? {} : { [sort.replace(/['"]+/g, '')]: 1 });

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const count = await compModal.find(filter == '' || !filter ? {} : { status: [filter] }).collation({ 'locale': 'en' }).sort(sort == '' || !sort ? {} : { [sort.replace(/['"]+/g, '')]: 1 }).countDocuments()

        const data = {}
        data.data = Comps.slice(startIndex, endIndex)

        data.data.forEach((record, i) => {
            record.rowNumber = startIndex + i + 1;
        });


        data.totalPages = Math.ceil(count / limit)
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
>>>>>>> 955a9daa24a5c368ef4909de23f09e760f7febb2
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
const cimsDel = async (req, res) => {
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
const cimsPatch = async (req, res) => {
<<<<<<< HEAD
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
=======

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
        data = req.body
        message = "Data updated successfully";

        const resData = customResponse({
            code,
            message,
            data
        });
        return res.send(resData);
>>>>>>> 955a9daa24a5c368ef4909de23f09e760f7febb2
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

<<<<<<< HEAD
module.exports = { cimsDel, cimsGet, cimsPatch, cimsPost, getbystatus };
=======
//Searching the records
const searchRecords = async (req, res) => {
    try {
        const searchData = req.query.searchData;
        let regex = new RegExp(searchData, "i");
        
        const records = await compModal.find({ $or: [{ brandName: [regex] }, { 'registeredAddress.country': [regex] }, { 'contacts.primaryContact.firstName': [regex] }] })

        const data = records


        data.forEach((record, i) => {
            record.rowNumber = i + 1;
        });

        code = 200
        message = "Data fetched successfully"

        const resData = customResponse({
            code,
            data,
            message,
        });

        res.send(resData);

    } catch (err) {
        code = 422;
        const resData = customResponse({
            code,
            error: err && err.details,
        });

        res.send(resData);
    }
}


module.exports = { searchRecords, cimsDel, cimsGet, cimsPatch, cimsPost, getbystatus }
>>>>>>> 955a9daa24a5c368ef4909de23f09e760f7febb2
