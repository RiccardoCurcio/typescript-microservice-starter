import { Schema } from "mongoose";
import IUser from "@/db/mongodb/Interfaces/IUser";

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    enable: Boolean,
    password: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
});

export default userSchema;