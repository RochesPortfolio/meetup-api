# meetup-api

## DB
user: admin
Pass: rootRDS123!

### Creds 

```javascript
{
    type: "mysql",
    host: "meetup-database.cxewu6gc4gul.us-east-2.rds.amazonaws.com",
    port: 3306,
    username: "admin",
    password: "rootRDS123!",
    database: "MeetUpDev",
    // agregar las entidades a la configuración
    entities: [
        User
    ],
    logging: true,
    synchronize: true,
}
```


