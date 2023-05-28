"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const WelcomeEmail_1 = __importDefault(require("./EmailService/WelcomeEmail"));
const AdmissionReport_1 = __importDefault(require("./EmailService/AdmissionReport"));
const AppointmentEmail_1 = __importDefault(require("./EmailService/AppointmentEmail"));
const diagnosisEmail_1 = __importDefault(require("./EmailService/diagnosisEmail"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const run = () => {
    node_cron_1.default.schedule('* * * * *', () => {
        (0, WelcomeEmail_1.default)();
        (0, AdmissionReport_1.default)();
        (0, AppointmentEmail_1.default)();
        (0, diagnosisEmail_1.default)();
    });
};
run();
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Background services is running on port ${PORT}`);
});
