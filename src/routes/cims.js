const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const cimsRouter = express.Router();
const {
    cimsDel,
    cimsGet,
    cimsPatch,
    cimsPost,
    getbystatus,
    getFilteredClients,
} = require("../controller/cimsController");

cimsRouter.get("/", cimsGet);
cimsRouter.post("/", cimsPost);
cimsRouter.delete("/", cimsDel);
cimsRouter.patch("/", cimsPatch);
cimsRouter.get("/status", getbystatus);
cimsRouter.get("/filter", getFilteredClients);

// const token_secret =
//     "6850cc6ab29180f03f647c9b7ff331298038b2cd9bf71980f87bfd547e0da37ac60c4c5d7f7136f81b81496a741f496ea3e528b70755bcf020874e0ef01446db";

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     if (token == null) return res.sendStatus(401);

//     jsonwebtoken.verify(token, token_secret, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }

module.exports = cimsRouter;