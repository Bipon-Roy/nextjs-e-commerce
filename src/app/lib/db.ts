import mongoose from "mongoose";

let connection: typeof mongoose;

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@nextjs.uarhekm.mongodb.net/ecomDb`;

const startDb = async () => {
    try {
        if (!connection) {
            connection = await mongoose.connect(uri);
        }
        console.log("Connected to DB");

        return connection;
    } catch (error) {
        throw new Error((error as any).message);
    }
};

export default startDb;
