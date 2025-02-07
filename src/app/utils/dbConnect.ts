import mongoose from "mongoose";
declare global {
  var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("MONGODB_URI must be defind in .env file.");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  } else if (!cached.promise) {
    console.log("connecting to db: promise");
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose);
  }

  try {
    console.log("connecting to db: connection");
    cached.conn = await cached.promise;
    console.log("connected to db");
  } catch (err) {
    console.log("error connecting to db");
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
