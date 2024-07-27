import * as express from "express"
import { config } from "./config/local"
import { myDataSource } from "./database/app-data-source"
import commandRoutes from "./routes/command.routes"
import queryRoutes from "./routes/query.routes"

// create and setup express app
const app = express()
app.use(express.json())

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("✅ Data Source has been initialized!")

        // register routes
        app.use('/api', commandRoutes);
        app.use('/api', queryRoutes);

        // start express server
        app.listen(config.server.port, () => {
            console.log(`✅🪛 Server is running in http://localhost:${config.server.port} 💻`)
        })


    })
    .catch((err) => {
        console.error("❌ Error during Data Source initialization:", err)
    })



