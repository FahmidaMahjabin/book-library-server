"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constants_1 = require("./academicSemester.constants");
const academicSemesterCreateVedilation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constants_1.title], {
            required_error: 'title is required',
        }),
        code: zod_1.z.enum([...academicSemester_constants_1.code], {
            required_error: 'code is required',
        }),
        year: zod_1.z.string({
            required_error: 'year is required',
        }),
        startMonth: zod_1.z.enum([...academicSemester_constants_1.month], {
            required_error: 'startMonth is required',
        }),
        endMonth: zod_1.z.enum([...academicSemester_constants_1.month], {
            required_error: 'endMonth is required',
        }),
    }),
});
const academicSemesterUpdateVelidation = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...academicSemester_constants_1.title], {
            required_error: 'title is required',
        })
            .optional(),
        code: zod_1.z
            .enum([...academicSemester_constants_1.code], {
            required_error: 'code is required',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'year is required',
        })
            .optional(),
        startMonth: zod_1.z
            .enum([...academicSemester_constants_1.month], {
            required_error: 'startMonth is required',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemester_constants_1.month], {
            required_error: 'endMonth is required',
        })
            .optional(),
    }),
})
    .refine(value => (value.body.title && value.body.code) ||
    (!value.body.title && !value.body.code), {
    message: "Both title and code shuld be provided or  don't give any of the title and code",
});
exports.academicSemesterValidation = {
    academicSemesterCreateVedilation,
    academicSemesterUpdateVelidation,
};
