"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const vendor_route_1 = __importDefault(require("./routes/vendor.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use("/api/auth", auth_route_1.default);
app.use("/api/admin", admin_route_1.default);
app.use("/api/vendor", vendor_route_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server listening http://localhost:${PORT}`);
});
