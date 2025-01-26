import { connect } from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export async function initConnection() {
  const url = process.env.DB_URI;

  console.log("Caminho do .env:", path.resolve(__dirname, "../.env"));
  console.log("DB_URI:", url);

  if (!url) {
    throw new Error("DB_URI não está definida no arquivo .env");
  }

  return await connect(url, {
    timeoutMS: 5000,
  });
}
