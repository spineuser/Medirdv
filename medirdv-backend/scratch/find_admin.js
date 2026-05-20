const mysql = require('mysql2/promise');

async function findAdmin() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'medirdv_user',
        password: '1234',
        database: 'medirdv'
    });

    const [rows] = await connection.execute('SELECT * FROM user WHERE role = "admin"');
    console.log(JSON.stringify(rows, null, 2));

    await connection.end();
}

findAdmin().catch(console.error);
