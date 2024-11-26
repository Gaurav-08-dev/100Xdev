"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                username,
                firstName,
                lastName,
                password,
            },
        });
        console.log(res);
    });
}
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const res = yield prisma.user.update({
            where: { username },
            data: { firstName, lastName },
        });
        console.log(res);
    });
}
// updateUser("gaurav@g.com", { firstName: "cristiano", lastName: "Rana" });
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findFirst({
            where: {
                username,
            },
        });
        console.log(res);
    });
}
// getUser("test@g.com")
function deleteUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.delete({
            where: {
                username,
            },
        });
        console.log(res);
    });
}
// deleteUser("gaurav@g.com")
function createTodo(title, description, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = yield prisma.todo.create({
            data: {
                title,
                description,
                userId
            }
        });
        console.log(todo);
    });
}
// createTodo("go to moon", "go to moon and die", 1)
function getTodo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = yield prisma.todo.findMany({
            where: {
                userId: userId
            }
        });
        console.log(todo);
    });
}
// getTodo(2)
function getUserDetailsandTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const details = yield prisma.todo.findMany({
            where: { userId: userId },
            select: {
                user: true,
                title: true,
                description: true
            }
        });
        console.log(details);
    });
}
getUserDetailsandTodos(2);
