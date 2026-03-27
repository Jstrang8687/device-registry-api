export enum DeviceType {
    ROKU = "roku",
    FIRE_TV = "fire_tv",
    APPLE_TV = "apple_tv",
    GAMING_CONSOLE = "gaming_console",
    SET_TOP_BOX = "set_top_box"
}

export enum DeviceStatus {
    ONLINE = "online",
    OFFLINE = "offline",
    BUSY = "busy"
}

export interface Device {
    id: string;
    name: string;
    type: DeviceType;
    status: DeviceStatus;
    ipAddress: string;
    registeredAt: Date;
}

export interface CreateDeviceDTO {
    name: string;
    type: DeviceType;
    ipAddress: string;
}