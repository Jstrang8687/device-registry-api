import { Device, CreateDeviceDTO, DeviceStatus } from "./types";
import { randomUUID } from "crypto";

let devices: Device[] = [];

export function getAllDevices(): Device[] {
    return devices;
}

export function getDeviceById(id: string): Device | undefined {
    return devices.find(device => device.id === id);
}

export function createDevice(dto: CreateDeviceDTO): Device {
    const newDevice: Device = {
        id: randomUUID(),
        name: dto.name,
        type: dto.type,
        status: DeviceStatus.ONLINE,
        ipAddress: dto.ipAddress,
        registeredAt: new Date()
    };
    devices.push(newDevice);
    return newDevice;
}

export function updateDeviceStatus(id: string, status: DeviceStatus): Device | undefined {
    const device = devices.find((d) => d.id === id);
    if (!device) {
        return undefined;
    }
    device.status = status;
    return device;
}

export function deleteDevice(id: string): boolean {
    const index = devices.findIndex((d) => d.id === id);
    if (index === -1) {
        return false;
    }
    devices.splice(index, 1);
    return true;
}