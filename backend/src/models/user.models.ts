import 'dotenv/config'
import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

export const userSchema = new Schema({
    userName: { type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    refreshToken : {type : String, trim: true },
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12)
        next()
    }   
})

userSchema.methods.isPasswordCorrect = async function(password:string) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return jsonwebtoken.sign({_id: this._id.toString()}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken = async function () {
    return jsonwebtoken.sign({_id: this._id.toString()}, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}


export const User = model("user", userSchema)



