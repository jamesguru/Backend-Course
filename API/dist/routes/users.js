"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../Controllers/users");
const router = (0, express_1.Router)();
router.post('/signup', users_1.signUp);
router.post('/signin', users_1.signIn);
router.get('/', users_1.getUsers);
exports.default = router;
