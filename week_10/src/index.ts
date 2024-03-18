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

getUser("gaurav@gaurav.com")

// * RELATIONSHIPS
