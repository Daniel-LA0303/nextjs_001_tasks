//1. conexion a la db de mongo con mongose
import { connect, connection } from "mongoose";

const conn = {
    isConnected : false
}

export async function dbConnect (){
    //evitar que se conecte varias veces
    if(conn.isConnected) return;

    const db = await connect("mongodb+srv://root:root@cluster0.odotr.mongodb.net/nextjs_001_db_tasks");
    // db.connections.[0].re
    conn.isConnected = db.connections[0].readyState;

    console.log(db.connection.db.databaseName);
}

connection.on("connected", () => {
    console.log("mongo is connected");
});

connection.on("error", (err) => {
    console.log(err);
})