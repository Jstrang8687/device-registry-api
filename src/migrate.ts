import pool from "./db";
import "dotenv/config";

async function migrate() {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS devices (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL,
            type VARCHAR(50) NOT NULL,
            ip_address VARCHAR(50) NOT NULL,
            status VARCHAR(50) NOT NULL DEFAULT 'online',
            registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )`
    );

    console.log("Migration completed.");
    await pool.end();
}
migrate().catch(console.error);

