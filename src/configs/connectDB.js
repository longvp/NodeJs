import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'long18920',
    database: 'nodejs_basic',
});

export default pool;

//import mysql from "mysql2";

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'long18920',
//     database: 'nodejs_basic',
// });

// export default connection;