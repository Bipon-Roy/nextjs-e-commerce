import mongoose, { Mongoose } from "mongoose";

// Define the URI for the database connection
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@nextjs.uarhekm.mongodb.net/ecomDb`;

// Extend the NodeJS global object to include mongoose
declare global {
    namespace NodeJS {
        interface Global {
            mongoose: {
                conn: Mongoose | null;
                promise: Promise<Mongoose> | null;
            };
        }
    }
}

// Initialize the mongoose global object if it doesn't already exist
const globalWithMongoose = global as typeof globalThis & {
    mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
};

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
}

// Function to start the database connection
const startDb = async (): Promise<Mongoose> => {
    if (globalWithMongoose.mongoose.conn) {
        // Reuse existing connection if available
        return globalWithMongoose.mongoose.conn;
    }

    if (!globalWithMongoose.mongoose.promise) {
        // Create a new connection if no promise exists
        globalWithMongoose.mongoose.promise = mongoose.connect(uri).then((mongoose) => {
            return mongoose;
        });
    }

    // Wait for the promise to resolve if connection is being established
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
    return globalWithMongoose.mongoose.conn;
};

export default startDb;
