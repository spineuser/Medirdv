const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function createAdmin() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'medirdv_user',
        password: '1234',
        database: 'medirdv'
    });

    const email = 'admin@medirdv.io';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
    
    if (rows.length === 0) {
        await connection.execute(
            'INSERT INTO user (fullName, email, password, role) VALUES (?, ?, ?, ?)',
            ['Administrator', email, hashedPassword, 'admin']
        );
        console.log('Admin user created: admin@medirdv.io / admin123');
    } else {
        await connection.execute(
            'UPDATE user SET role = "admin", password = ? WHERE email = ?',
            [hashedPassword, email]
        );
        console.log('Existing user promoted to admin: admin@medirdv.io / admin123');
    }

    await connection.end();
}

createAdmin().catch(console.error);
