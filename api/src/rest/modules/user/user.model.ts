import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

export type User = {
  name: string;
  email: string;
  password: string;
  imgUrl: string;

  hashPwd: (pwd: string) => Promise<string>;
  compare: (pwd: string, hashedPwd: string) => Promise<boolean>;
};

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true,
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 100,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 3,
      required: true,
    },
    imgUrl: { type: String },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

userSchema.methods = {
  hashPwd: (password: string) => {
    return hash(password, String(process.env.salt));
  },
  compare: (password: string, hashedPassword: string) => {
    return compare(password, hashedPassword);
  },
};

const userModel = model("User", userSchema);

export { userModel };
