import { Client } from "pg";
import "dotenv/config";

const client = new Client({
  connectionString: process.env.NEON_CONNECTION_STRING,
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(` 
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`);
  console.log(result);
}

// createUsersTable();
async function insertData(username: string, email: string, password: string) {
  try {
    await client.connect();
    // 1. Create the query
    const insertQUery =
      "INSERT INTO users (username, email,password) VALUES ($1, $2, $3)";

    // 2. values to be inserted
    const values = [username, email, password];

    // 3. Make the query
    const res = await client.query(insertQUery, values);
    console.log("Data Inserted Successfully", res);
  } catch (error) {
    console.log("Error during insertion", error);
  } finally {
    await client.end();
  }
}

// insertData("gaurav", "gaurav@gaurav.com", "gauravas").catch(console.error);

async function getUser(email: string) {
  try {
    await client.connect();
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const res = await client.query(query, values);
    console.log("User Found", res.rows);
    return null;
  } catch (error) {
    console.log("Error during insertion", error);
    throw error;
  } finally {
    await client.end();
  }
}

// getUser("gaurav@gaurav.com")

// * RELATIONSHIPS & TRANSACTIONS

async function createAddressTable() {
  await client.connect();
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
  const result = await client.query(query);
  console.log(result);
}

// createAddressTable()

async function insertUserAndAddress(
  username: string,
  email: string,
  password: string,
  city: string,
  country: string,
  street: string,
  pincode: string
) {
  try {
    await client.connect();

    await client.query("BEGIN"); // * START TRANSACTION

    const insertUserText = `INSERT INTO users (username,email,password)
    VALUES ($1, $2,$3)
    RETURNING id
    `;

    const userRes = await client.query(insertUserText, [
      username,
      email,
      password,
    ]);
    console.log("UserRes", userRes);

    const userId = userRes.rows[0].id;

    const insertAddressText = `
    INSERT INTO addresses (user_id, city, country, street, pincode)
    VALUES ($1, $2, $3, $4, $5)`;

    await client.query(insertAddressText, [
      userId,
      city,
      country,
      street,
      pincode,
    ]);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
  } finally {
    await client.end();
  }
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


async function getUserAndAddress(userId: string){
  try {
    await client.connect();
    const query = `SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
    FROM users us
    JOIN addresses a ON u.id = a.user_id
    WHERE u.id =  $1
    `
    const result = await client.query(query, [userId]);

    console.log(result.rows)
  } catch (error) {
    throw error
  }
  finally{
    await client.end()
  }
}

// getUserAndAddress('9')