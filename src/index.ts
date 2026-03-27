import express, { Application } from 'express';
import deviceRouter from "./routes/devices";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/devices", deviceRouter);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log('Device Registry API running on port ' + PORT);
    });
}