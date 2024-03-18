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
const pg_1 = require("pg");
require("dotenv/config");
const client = new pg_1.Client({
    connectionString: process.env.NEON_CONNECTION_STRING,
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`);
        console.log(result);
    });
}
// createUsersTable();
function insertData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            // 1. Create the query
            const insertQUery = "INSERT INTO users (username, email,password) VALUES ($1, $2, $3)";
            // 2. values to be inserted
            const values = [username, email, password];
            // 3. Make the query
            const res = yield client.query(insertQUery, values);
            console.log("Data Inserted Successfully", res);
        }
        catch (error) {
            console.log("Error during insertion", error);
        }
        finally {
            yield client.end();
        }
    });
}
// insertData("gaurav", "gaurav@gaurav.com", "gauravas").catch(console.error);
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = "SELECT * FROM users WHERE email = $1";
            const values = [email];
            const res = yield client.query(query, values);
            console.log("User Found", res.rows);
            return null;
        }
        catch (error) {
            console.log("Error during insertion", error);
            throw error;
        }
        finally {
            yield client.end();
        }
    });
}
getUser("gaurav@gaurav.com");
// * RELATIONSHIPS
