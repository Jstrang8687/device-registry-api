import { Router, Request, Response } from 'express';
import {
    getAllDevices,
    getDeviceById,
    createDevice,
    updateDeviceStatus,
    deleteDevice
} from "../deviceStore";
import { DeviceStatus, DeviceType,  } from '../types';

const router = Router();

// Get all devices
router.get('/', (req: Request, res: Response) => {
    const devices = getAllDevices();
    res.json(devices);
});

// Get device by ID
router.get('/:id', (req: Request, res: Response) => {
    const device = getDeviceById(req.params.id as string);   
    if (!device) {
        res.status(404).json({ error: 'Device not found' });
        return;
    }
    res.json(device);
});

// Create a new device
router.post('/', (req: Request, res: Response) => {
    const { name, type, ipAddress } = req.body;
    if (!name || !type || !ipAddress) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    if (!Object.values(DeviceType).includes(type)) {
        res.status(400).json({ error: 'Invalid device type' });
        return;
    }
    const newDevice = createDevice({ name, type, ipAddress });
    res.status(201).json(newDevice);
});

// Update devicestatus
router.patch('/:id/status', (req: Request, res: Response) => {
    const { status } = req.body;
    if (!Object.values(DeviceStatus).includes(status))  {
       res.status(400).json({ error: 'Missing status field' });
       return;
    }
    const device = updateDeviceStatus(req.params.id as string, status);
    if (!device) {
        res.status(404).json({ error: 'Device not found' });
        return;
    }
    res.json(device);
});

// Delete a device
router.delete('/:id', (req: Request, res: Response) => {
    const success = deleteDevice(req.params.id as string);
    if (!success) {
        res.status(404).json({ error: 'Device not found' });
        return;
    }
    res.json({ error: 'Device deleted successfully' });
});

export default router;
