import { connect } from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export async function initConnection() {
  const url = process.env.DB_URI;

  if (!url) {
    throw new Error("DB_URI não está definida no arquivo .env");
  }

  return await connect(url, {
    timeoutMS: 5000,
    dbName: process.env.DB_NAME,
  });
}
