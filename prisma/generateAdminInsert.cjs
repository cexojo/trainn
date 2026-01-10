// Usage: node prisma/generateAdminInsert.js
// Description: Prompts for admin details, hashes password, prints SQL INSERT for the User table (for SQLite).
const readline = require('readline');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

(async function main() {
  const firstName = await prompt("Enter admin first name: ");
  const lastName = await prompt("Enter admin last name: ");
  const username = await prompt("Enter admin username: ");
  const email = await prompt("Enter admin email: ");
  const passwordPlain = await prompt("Enter admin password (input visible): ");
  const isocode = await prompt("Enter admin country isocode (e.g. 'es'): ");

  if (!firstName || !lastName || !username || !email || !passwordPlain || !isocode) {
    console.error("All fields are required.");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(passwordPlain, 10);
  const id = uuidv4();
  const role = 'admin';

  // Adjust field list to match your DB if it differs
  const sql = `INSERT INTO User (id, firstName, lastName, username, email, password, isocode, role)
VALUES (
  '${id}',
  '${firstName.replace(/'/g, "''")}',
  '${lastName.replace(/'/g, "''")}',
  '${username.replace(/'/g, "''")}',
  '${email.replace(/'/g, "''")}',
  '${hashedPassword}',
  '${isocode.replace(/'/g, "''")}',
  '${role}'
);`;

  console.log("\n--- Copy and execute the following SQL in your database ---\n");
  console.log(sql);
  console.log("\n---");
})();
