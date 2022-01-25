class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "search",
      "term",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    this.query = this.query.find(queryObj);

    return this;
  }

  searchEmp() {
    if (this.queryString.search) {
      this.query = this.query.find({
        $or: [
          { empName: { $regex: this.queryString.search, $options: "i" } },
          { empId: { $regex: this.queryString.search, $options: "i" } },
          { empEmail: { $regex: this.queryString.search, $options: "i" } },
          {
            empHobbies: {
              $regex: this.queryString.search,
              $options: "i",
            },
          },
          {
            empSkillSet: {
              $regex: this.queryString.search,
              $options: "i",
            },
          },
          {
            empCertifications: {
              $regex: this.queryString.search,
              $options: "i",
            },
          },
          {
            empPrimaryCapability: {
              $regex: this.queryString.search,
              $options: "i",
            },
          },
          {
            role: {
              $regex: this.queryString.search,
              $options: "i",
            },
          },
          {
            empDesignation: {
              $regex: this.queryString.search,
              $options: "i",
            },
          },
          {
            empDepartment: {
              $regex: this.queryString.search,
              $options: "i",
            },
          },
        ],
      });
    }

    return this;
  }

  searchReview() {
    if (this.queryString.search) {
      this.query = this.query.find({
        $or: [
          { reqName: { $regex: this.queryString.search, $options: "i" } },
          { status: { $regex: this.queryString.search, $options: "i" } },
          { reqType: { $regex: this.queryString.search, $options: "i" } },
        ],
      });
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("empName");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
