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
router.get('/', async (req: Request, res: Response) => {
    try {
        const devices = await getAllDevices();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve devices' });
    }
});

// Get device by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const device = await getDeviceById(req.params.id as string);
        if (!device) {
            res.status(404).json({ error: 'Device not found' });
            return;
        }
        res.json(device);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve device' });
    }
});

// Create a new device
router.post('/', async (req: Request, res: Response) => {
    try {
    const { name, type, ipAddress } = req.body;

    if (!name || !type || !ipAddress) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    if (!Object.values(DeviceType).includes(type)) {
        res.status(400).json({ error: 'Invalid device type' });
        return;
    }

    const newDevice = await createDevice({ name, type, ipAddress });
    res.status(201).json(newDevice);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create device' });
    }
});


// Update devicestatus
router.patch('/:id/status', async (req: Request, res: Response) => {
    try {
        const { status } = req.body;

        if (!Object.values(DeviceStatus).includes(status))  {
            res.status(400).json({ error: 'Missing status field' });
            return;
        }

        const device = await updateDeviceStatus(req.params.id as string, status);
        if (!device) {
            res.status(404).json({ error: 'Device not found' });
            return;
        }
        res.json(device);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update device status' });
    }
});

// Delete a device
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const success = await deleteDevice(req.params.id as string);
        if (!success) {
            res.status(404).json({ error: 'Device not found' });
            return;
        }
        res.status(204).send();     
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete device' });
    }
});

export default router;
