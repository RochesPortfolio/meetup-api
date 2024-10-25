import * as express from "express"
import { config } from "./config/local"
import * as cors from "cors"
import { myDataSource } from "./database/app-data-source"
import commandRoutes from "./routes/command.routes"
import queryRoutes from "./routes/query.routes"
import * as swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './../swaggerConfig';

// create and setup express app
const app = express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000', // Permitir solicitudes desde el frontend
}));

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("✅ Data Source has been initialized!")

        // register routes
        app.use('/api', commandRoutes);
        app.use('/api', queryRoutes);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 

        // start express server
        app.listen(config.server.port, () => {
            console.log(`✅🪛 Server is running in http://localhost:${config.server.port} 💻`)
        })


    })
    .catch((err) => {
        console.error("❌ Error during Data Source initialization:", err)
    })



