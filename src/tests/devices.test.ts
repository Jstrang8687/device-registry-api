import request from "supertest";
import app from "../index";
import pool from "../db";

afterAll(async () => {
  await pool.end();
});

beforeEach(async () => {
  await pool.query("DELETE FROM devices");
});

describe("Device Registry API", () => {
  
  describe("POST /devices", () => {
    it("should register a new device", async () => {
      const res = await request(app).post("/devices").send({
        name: "Lab Roku 1",
        type: "roku",
        ipAddress: "192.168.1.101",
      });

      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Lab Roku 1");
      expect(res.body.type).toBe("roku");
      expect(res.body.status).toBe("online");
      expect(res.body.id).toBeDefined();
    });

    it("should reject missing fields", async () => {
      const res = await request(app).post("/devices").send({
        name: "Lab Roku 1",
      });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("should reject an invalid device type", async () => {
      const res = await request(app).post("/devices").send({
        name: "Lab Roku 1",
        type: "playstation",
        ipAddress: "192.168.1.101",
      });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("GET /devices", () => {
    it("should return all devices", async () => {
      await request(app).post("/devices").send({
        name: "Lab Roku 1",
        type: "roku",
        ipAddress: "192.168.1.101",
      });

      const res = await request(app).get("/devices");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });

  describe("GET /devices/:id", () => {
    it("should return a single device", async () => {
      const created = await request(app).post("/devices").send({
        name: "Lab Fire TV 1",
        type: "fire_tv",
        ipAddress: "192.168.1.102",
      });

      const res = await request(app).get(`/devices/${created.body.id}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(created.body.id);
    });

    it("should return 404 for a device that does not exist", async () => {
      const res = await request(app).get("/devices/00000000-0000-0000-0000-000000000000");
      expect(res.status).toBe(404);
    });
  });

  describe("PATCH /devices/:id/status", () => {
    it("should update a device status", async () => {
      const created = await request(app).post("/devices").send({
        name: "Lab Apple TV 1",
        type: "apple_tv",
        ipAddress: "192.168.1.103",
      });

      const res = await request(app)
        .patch(`/devices/${created.body.id}/status`)
        .send({ status: "busy" });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("busy");
    });

    it("should reject an invalid status", async () => {
      const created = await request(app).post("/devices").send({
        name: "Lab Apple TV 1",
        type: "apple_tv",
        ipAddress: "192.168.1.103",
      });

      const res = await request(app)
        .patch(`/devices/${created.body.id}/status`)
        .send({ status: "broken" });

      expect(res.status).toBe(400);
    });
  });

  describe("DELETE /devices/:id", () => {
    it("should delete a device", async () => {
      const created = await request(app).post("/devices").send({
        name: "Lab Roku 1",
        type: "roku",
        ipAddress: "192.168.1.101",
      });

      const res = await request(app).delete(`/devices/${created.body.id}`);
      expect(res.status).toBe(204);
    });

    it("should return 404 when deleting a device that does not exist", async () => {
      const res = await request(app).delete("/devices/00000000-0000-0000-0000-000000000000");
      expect(res.status).toBe(404);
    });
  });
});