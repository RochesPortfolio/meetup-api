import { DataSource, DataSourceOptions } from "typeorm"
import { config } from "../config/local"
export const myDataSource = new DataSource(
    {
        ...config.db
    } as DataSourceOptions
)