import { Client } from "pg";

const client: Client = new Client({
    user: "Borchoski",
    password: "amilton12",
    host: "localhost",
    database: "m4_entrega_02",
    port: 5432,
});

const startDatabase = async (): Promise<void> => {
    await client.connect();
    console.log("Database connected");
};

export { client, startDatabase };
