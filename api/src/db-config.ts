import { connect } from "mongoose";

const url = String(process.env.DB_URI);

export async function initConnection() {
  if (!url) {
    throw new Error("Invalid database URL");
  }

  return await connect(url, {
    timeoutMS: 5000,
  });
}
