import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@nextjs.uarhekm.mongodb.net/ecomDb`;

const startDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        // If already connected, return the existing connection
        return mongoose.connection;
    }

    try {
        // Establish a new connection
        const connection = await mongoose.connect(uri);

        return connection;
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
};

export default startDb;
