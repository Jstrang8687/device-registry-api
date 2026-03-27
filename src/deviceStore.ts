import pool from "./db";
import { Device, CreateDeviceDTO, DeviceStatus } from "./types";

let devices: Device[] = [];

export async function getAllDevices(): Promise<Device[]> {
    const result = await pool.query(
        "SELECT id, name, type, status, ip_address AS \"ipAddress\", registered_at AS \"registeredAt\" FROM devices"
    );
    return result.rows;
}

export async function getDeviceById(id: string): Promise<Device | undefined> {
    const result = await pool.query(
        "SELECT id, name, type, status, ip_address AS \"ipAddress\", registered_at AS \"registeredAt\" FROM devices WHERE id = $1", [id]
    );
    return result.rows[0];
}

export async function createDevice(dto: CreateDeviceDTO): Promise<Device> {
    const result = await pool.query(
        "INSERT INTO devices (name, type, ip_address) VALUES ($1, $2, $3) \
         RETURNING id, name, type, status, ip_address AS \"ipAddress\", registered_at AS \"registeredAt\"",
        [dto.name, dto.type, dto.ipAddress]
    );
    return result.rows[0];
}

export async function updateDeviceStatus(id: string, status: DeviceStatus): Promise<Device | undefined> {
    const result = await pool.query(
        "UPDATE devices SET status = $1 WHERE id = $2 \
        RETURNING id, name, type, status, ip_address AS \"ipAddress\", registered_at AS \"registeredAt\"",
        [status, id]
    );
    return result.rows[0];
}

export async function deleteDevice(id: string): Promise<boolean> {
    const result = await pool.query(
        "DELETE FROM devices WHERE id = $1", [id]
    );
    return result.rowCount !== null && result.rowCount > 0;
}