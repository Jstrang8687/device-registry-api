# Device Registry API

A REST API for registering, managing, and tracking streaming devices across engineering lab environments. Built with **Node.js**, **TypeScript**, and **Express**.

Inspired by real-world device lab tooling used in streaming platforms — where QA, product, and engineering teams need to remotely manage and automate hardware like Roku, Fire TV, Apple TV, and set-top boxes.

---

## Tech Stack

- **Node.js** (v24+)
- **TypeScript**
- **Express**
- **ts-node** + **nodemon** for development

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation
```bash
git clone https://github.com/Jstrang8687/device-registry-api.git
cd device-registry-api
npm install
```

### Run in development
```bash
npm run dev
```

Server runs at `http://localhost:3000`

---

## API Endpoints

### Devices

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/devices` | Get all registered devices |
| GET | `/devices/:id` | Get a single device by ID |
| POST | `/devices` | Register a new device |
| PATCH | `/devices/:id/status` | Update a device's status |
| DELETE | `/devices/:id` | Remove a device |

---

### Register a device
```bash
curl -X POST http://localhost:3000/devices \
  -H "Content-Type: application/json" \
  -d '{"name": "Lab Roku 1", "type": "roku", "ipAddress": "192.168.1.101"}'
```
curl -X POST http://localhost:3000/devices \
  -H "Content-Type: application/json" \
  -d '{"name": "Lab Apple_tv 1", "type": "apple_tv", "ipAddress": "192.168.3.101"}'

**Supported device types:** `roku` `fire_tv` `apple_tv` `gaming_console` `set_top_box`

### Update device status
```bash
curl -X PATCH http://localhost:3000/devices/:id/status \
  -H "Content-Type: application/json" \
  -d '{"status": "busy"}'
```

**Supported statuses:** `online` `offline` `busy`

### Get all devices
```bash
curl http://localhost:3000/devices
```

### Delete a device
```bash
curl -X DELETE http://localhost:3000/devices/:id
```

---

## Project Structure
```
src/
├── index.ts          # Entry point
├── types.ts          # Interfaces, enums (Device, DeviceType, DeviceStatus)
├── deviceStore.ts    # In-memory data layer
└── routes/
    └── devices.ts    # Route handlers
```

---

## Roadmap

- [ ] Persist devices to a database (PostgreSQL or MongoDB)
- [ ] Add authentication
- [ ] Add a command endpoint to send mock instructions to devices
- [ ] Dockerize the application
- [ ] Deploy to AWS

---

## Author

**Jason Strang**  
[GitHub](https://github.com/Jstrang8687)