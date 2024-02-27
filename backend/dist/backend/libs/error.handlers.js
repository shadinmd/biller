"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle500ServerError = void 0;
const handle500ServerError = (res) => {
    res.status(500).send({
        success: false,
        message: "server error"
    });
};
exports.handle500ServerError = handle500ServerError;
