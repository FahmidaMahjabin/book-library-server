"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationFields = exports.searchableFields = exports.filterableFields = exports.titleAndCodeMapper = exports.code = exports.title = exports.month = void 0;
exports.month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
exports.title = ['Autumn', 'Fall', 'Summer'];
exports.code = ['01', '02', '03'];
exports.titleAndCodeMapper = {
    Autumn: '01',
    Fall: '02',
    Summer: '03',
};
exports.filterableFields = ['searchTerm', 'title', 'year', 'code'];
exports.searchableFields = ['title', 'year', 'code'];
exports.paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];
