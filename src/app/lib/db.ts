import mongoose from "mongoose";

let connection: typeof mongoose;

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@nextjs.uarhekm.mongodb.net/?retryWrites=true&w=majority&appName=NextJs`;

const startDb = async () => {
    try {
        if (!connection) {
            connection = await mongoose.connect(uri);
        }
        return connection;
    } catch (error) {
        throw new Error((error as any).message);
    }
};

export default startDb;
