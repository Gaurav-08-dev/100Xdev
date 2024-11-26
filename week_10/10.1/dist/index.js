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
// getUser("gaurav@gaurav.com")
// * RELATIONSHIPS & TRANSACTIONS
function createAddressTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const query = `CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) on DELETE CASCADE
  )`;
        const result = yield client.query(query);
        console.log(result);
    });
}
// createAddressTable()
function insertUserAndAddress(username, email, password, city, country, street, pincode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            yield client.query("BEGIN"); // * START TRANSACTION
            const insertUserText = `INSERT INTO users (username,email,password)
    VALUES ($1, $2,$3)
    RETURNING id
    `;
            const userRes = yield client.query(insertUserText, [
                username,
                email,
                password,
            ]);
            console.log("UserRes", userRes);
            const userId = userRes.rows[0].id;
            const insertAddressText = `
    INSERT INTO addresses (user_id, city, country, street, pincode)
    VALUES ($1, $2, $3, $4, $5)`;
            yield client.query(insertAddressText, [
                userId,
                city,
                country,
                street,
                pincode,
            ]);
            yield client.query("COMMIT");
        }
        catch (error) {
            yield client.query("ROLLBACK");
            console.log(error);
        }
        finally {
            yield client.end();
        }
    });
}
// insertUserAndAddress(
//   'satpal',
//   'satpal.dosa@jhotta.com',
//   'securepassword123',
//   'New Delhi',
//   'MARS',
//   'CENTURIA GALAXY',
//   '100069'
// );
// * JOINS
function getUserAndAddress(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = `SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
    FROM users u
    JOIN addresses a ON u.id = a.user_id
    WHERE u.id =  $1
    `;
            const result = yield client.query(query, [userId]);
            console.log(result.rows);
        }
        catch (error) {
            throw error;
        }
        finally {
            yield client.end();
        }
    });
}
getUserAndAddress('9');
