const compModal = require("../models/compSchema");
const { cimsSchema, updateSchema } = require("../schema/cimsSchema");
const { customResponse } = require("../utility/helper");

//Get all records in database
const cimsGet = async (req, res) => {
  const sort = req.query.sort || "createdAt";
  const filter = req.query.filter || 1;
  const sortOrder = req.query.sortOrder || -1;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const searchData = req.query.searchData || "";
  const regex = new RegExp(searchData, "i");

  const filterQuery = { status: [parseInt(filter)] };
  const searchQuery = {
    $or: [
      { brandName: [regex] },
      { "registeredAddress.country": [regex] },
      { "contacts.primaryContact.firstName": [regex] },
      { "contacts.primaryContact.lastName": [regex] },
      {
        "contacts.primaryContact.firstName": [
          new RegExp(searchData.split(" ")[0], "i"),
        ],
        "contacts.primaryContact.lastName": [
          new RegExp(searchData.split(" ")[1], "i"),
        ],
      },
    ],
  };

  const findQuery = { ...filterQuery, ...searchQuery };
  const sortQuery = {
    [sort.replace(/['"]+/g, "")]: sortOrder,
  };

  const fetchData = async (findQuery, sortQuery) => {
    const Comps = await compModal
      .find(findQuery)
      .collation({ locale: "en" })
      .sort(sortQuery);

    return { Comps, count: Comps.length };
  };

  const handelPagination = (count, Comps) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
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

    return data;
  };

  try {
    const { Comps, count } = await fetchData(findQuery, sortQuery);

    if (count === 0) {
      const { Comps, count } = await fetchData(filterQuery, sortQuery);

      if (count === 0) {
        code = 404;
        message = `No "${
          parseInt(filter) ? "Active Client" : "Inactive Client"
        }" records exists`;

        const resData = customResponse({
          code,
          data: {},
          message,
          err: [
            {
              message,
            },
          ],
        });

        res.send(resData);
      } else {
        code = 404;
        message = `No record containing "${searchData}" exists`;

        const data = handelPagination(count, Comps);

        const resData = customResponse({
          code,
          data,
          message,
          err: [
            {
              message,
            },
          ],
        });

        res.send(resData);
      }
    } else {
      const data = handelPagination(count, Comps);

      code = 200;
      message = "Data fetched successfully";

      const resData = customResponse({
        data,
        code,
        message,
      });
      res.send(resData);
    }
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
    const brandName = req.body.brandName;

    data = newComp;
    code = 200;
    message = `Client with Brand name "${brandName}" added successfully`;

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

const setStatus = async (req, res) => {
  const { id, brandName } = req.query;
  const status = parseInt(req.query.status);

  try {
    await compModal.findOneAndUpdate({ _id: id }, { status: !status });

    code = 200;
    status
      ? (message = `Client with Brand name "${brandName}" has been Deactivated`)
      : (message = `Client with Brand name "${brandName}" has been Reactivated`);

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
    const brandName = req.body.brandName;

    code = 200;
    data = req.body;
    message = `Client with Brand name "${brandName}" updated successfully`;

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

const getFilteredClients = async (req, res) => {
  const query = req.query;
  try {
    if (Object.keys(req.query).length === 0) {
      const client = await compModal.find(
        { status: 1 },
        {
          _id: 1,
          brandName: 1,
          domain: 1,
          "contacts.primaryContact.firstName": 1,
          "contacts.primaryContact.lastName": 1,
          "contacts.primaryContact.contactNumber": 1,
          "contacts.secondaryContact.firstName": 1,
          "contacts.secondaryContact.lastName": 1,
          "contacts.tertiaryContact.firstName": 1,
          "contacts.tertiaryContact.lastName": 1,
          "contacts.otherContact1.firstName": 1,
          "contacts.otherContact1.lastName": 1,
          "contacts.otherContact2.firstName": 1,
          "contacts.otherContact2.lastName": 1,
        }
      );
      return res.status(200).send(client);
    } else {
      const client = await compModal.find(
        {
          $or: [
            {
              brandName: {
                $regex: query.brandName.trim(),
                $options: "i",
              },
            },
          ],
          status: 1,
        },
        {
          _id: 1,
          brandName: 1,
          domain: 1,
          "contacts.primaryContact.firstName": 1,
          "contacts.primaryContact.lastName": 1,
          "contacts.primaryContact.contactNumber": 1,
          "contacts.secondaryContact.firstName": 1,
          "contacts.secondaryContact.lastName": 1,
          "contacts.tertiaryContact.firstName": 1,
          "contacts.tertiaryContact.lastName": 1,
          "contacts.otherContact1.firstName": 1,
          "contacts.otherContact1.lastName": 1,
          "contacts.otherContact2.firstName": 1,
          "contacts.otherContact2.lastName": 1,
        }
      );
      return res.status(200).send(client);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getClientById = async (req, res) => {
  try {
    const _id = req.params.id;
    const client = await compModal.find({ _id: _id });
    res.status(200).send(client);
  } catch (error) {
    res.status(400).send(error);
  }
};
/* ****************************************** */

module.exports = {
  setStatus,
  cimsGet,
  cimsPatch,
  cimsPost,
  getFilteredClients,
  getClientById,
};
