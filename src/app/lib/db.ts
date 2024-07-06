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
                lastConnectionTime: number | null;
            };
        }
    }
}

// Initialize the mongoose global object if it doesn't already exist
const globalWithMongoose = global as typeof globalThis & {
    mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
        lastConnectionTime: number | null;
    };
};

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = {
        conn: null,
        promise: null,
        lastConnectionTime: null,
    };
}

// Function to start the database connection
const startDb = async (): Promise<Mongoose> => {
    const currentTime = new Date().getTime();
    const CONNECTION_TIMEOUT = 5 * 60 * 1000; // 3 minutes

    if (
        globalWithMongoose.mongoose.conn &&
        globalWithMongoose.mongoose.lastConnectionTime &&
        currentTime - globalWithMongoose.mongoose.lastConnectionTime < CONNECTION_TIMEOUT
    ) {
        // Reuse existing connection if within the timeout period
        return globalWithMongoose.mongoose.conn;
    }

    if (!globalWithMongoose.mongoose.promise) {
        // Create a new connection if no promise exists
        globalWithMongoose.mongoose.promise = mongoose
            .connect(uri, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                bufferCommands: false,
                autoIndex: false,
            })
            .then((mongoose) => {
                return mongoose;
            })
            .catch((err) => {
                globalWithMongoose.mongoose.promise = null;
                console.error("Failed to connect to MongoDB", err);
                throw err;
            });
    }

    // Wait for the promise to resolve if connection is being established
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
    globalWithMongoose.mongoose.lastConnectionTime = currentTime;
    return globalWithMongoose.mongoose.conn;
};

export default startDb;
