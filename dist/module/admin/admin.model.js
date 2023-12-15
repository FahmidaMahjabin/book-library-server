"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.adminSchema = void 0;
const mongoose_1 = require("mongoose");
const student_constant_1 = require("../student/student.constant");
exports.adminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
            },
            lastName: {
                type: String,
            },
        },
    },
    gender: {
        type: String,
        enum: student_constant_1.gender,
        required: true,
    },
    dateOfBirth: {
        type: String,
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    managementDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'managementDepartment',
    },
    designation: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Admin = (0, mongoose_1.model)('admin', exports.adminSchema);
