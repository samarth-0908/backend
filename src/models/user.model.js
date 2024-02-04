import mongoose, { Schema } from mongoose;
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true

        },

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },

        fullname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true

        },

        avatar: {
            type: String, //cloudinary url
            required: true,

        },

        coverImage: {
            type: String, //cloodinary url
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password: {
            type: String,
            require: [true, 'Password is required']
        },

        refreshToken: {
            type: String
        }


    },

    {
        timestamps: true,// from this we get created at , updated at
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function
    (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessTokten = function(){
    return Jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshTokten = function(){

    return Jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)