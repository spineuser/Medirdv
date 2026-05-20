const mysql = require('mysql2/promise');

async function resetDoctors() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'medirdv_user',
        password: '1234',
        database: 'medirdv'
    });

    console.log('Connected to DB');

    // Remove all appointments first (to avoid FK errors)
    await connection.execute('DELETE FROM appointment');
    console.log('Removed all appointments');

    // Remove all doctors
    await connection.execute('DELETE FROM user WHERE role = "doctor"');
    console.log('Removed all current doctors');

    const doctors = [
        { fullName: 'Lamyaa', email: 'lamyaa@medirdv.io', specialty: 'Neurology' },
        { fullName: 'Abdelkarim', email: 'abdelkarim@medirdv.io', specialty: 'Psychiatry' },
        { fullName: 'Rachid', email: 'rachid@medirdv.io', specialty: 'Pediatrics' },
        { fullName: 'Aabir', email: 'aabir@medirdv.io', specialty: 'Cardiology' },
        { fullName: 'Omar', email: 'omar@medirdv.io', specialty: 'Orthopedics' },
        { fullName: 'Karim', email: 'karim@medirdv.io', specialty: 'Dermatology' }
    ];

    // Password 'doctor123' hashed with bcrypt (placeholder)
    const hashedPassword = '$2b$10$jX1fc6QJ1gro5bHip7wjnOG.JAAulnrer2lW1lFHuSfNuq4IgF5Ri'; 

    for (const doc of doctors) {
        await connection.execute(
            'INSERT INTO user (fullName, email, password, role, specialty, gender) VALUES (?, ?, ?, ?, ?, ?)',
            [doc.fullName, doc.email, hashedPassword, 'doctor', doc.specialty, 'male']
        );
        console.log(`Inserted ${doc.fullName}`);
    }

    await connection.end();
    console.log('Done');
}

resetDoctors().catch(console.error);
