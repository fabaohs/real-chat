import { ObjectId, Schema, model } from "mongoose";
import { hash, compare, genSaltSync } from "bcrypt";

export type User = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  imgUrl?: string;

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
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.methods = {
  hashPwd: (password: string) => {
    const salt = genSaltSync(12);
    return hash(password, salt);
  },
  compare: (password: string, hashedPassword: string) => {
    return compare(password, hashedPassword);
  },
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await this.hashPwd(this.password);
  next();
});

const userModel = model("User", userSchema);

export { userModel as User };
