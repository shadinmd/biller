"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffLogin = exports.vendorRegister = exports.vendorLogin = exports.adminLogin = void 0;
const error_handlers_1 = require("../libs/error.handlers");
const adminLogin = (req, res) => {
    try {
    }
    catch (error) {
        console.log(error);
        (0, error_handlers_1.handle500ServerError)(res);
    }
};
exports.adminLogin = adminLogin;
const vendorLogin = (req, res) => {
    try {
    }
    catch (error) {
        console.log(error);
        (0, error_handlers_1.handle500ServerError)(res);
    }
};
exports.vendorLogin = vendorLogin;
const vendorRegister = (req, res) => {
    try {
    }
    catch (error) {
        console.log(error);
        (0, error_handlers_1.handle500ServerError)(res);
    }
};
exports.vendorRegister = vendorRegister;
const staffLogin = (req, res) => {
    try {
    }
    catch (error) {
        console.log(error);
        (0, error_handlers_1.handle500ServerError)(res);
    }
};
exports.staffLogin = staffLogin;
