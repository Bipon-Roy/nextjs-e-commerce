import mongoose, { Mongoose } from "mongoose";

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@nextjs.uarhekm.mongodb.net/ecomDb`;

// Declare global type extension for TypeScript
declare global {
    var mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
    };
}

// Initialize global.mongoose if it doesn't exist
global.mongoose = global.mongoose || { conn: null, promise: null };

const startDb = async (): Promise<Mongoose> => {
    if (global.mongoose.conn) {
        // Return existing connection
        return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
        // Create a new connection promise if it doesn't exist
        global.mongoose.promise = mongoose
            .connect(uri, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                bufferCommands: false,
                autoIndex: false,
            })
            .then((mongoose) => mongoose);
    }

    // Wait for the promise to resolve and set the connection
    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
};

export default startDb;
