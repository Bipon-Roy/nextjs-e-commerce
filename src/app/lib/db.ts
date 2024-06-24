import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null;

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@nextjs.uarhekm.mongodb.net/ecomDb`;

const startDb = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        cachedConnection = await mongoose.connect(uri);
        return cachedConnection;
    } catch (error) {
        cachedConnection = null;
        throw new Error((error as any).message);
    }
};

export default startDb;
