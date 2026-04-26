import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please fill a valid email address"
        ],

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    verificationCode: { 
        type: String 
    },
    verificationCodeExpires: { 
        type: Date 
    },
    forgotPasswordCode: {
        type: String,
        select: false,
    },
    forgotPasswordCodeValidation: {
        type: Number,
        select: false,
    },
}, { timestamps: true });

/**should not use arrow function here because we need to use "this" keyword to access the user document
   In arrow function "this" keyword will refer to the global object
   and not the user document, so we need to use regular function here**/

// this will run only when the save() method is called 
// it will hash the password before saving the user to the database
// it will only hash the password if it is modified or new, otherwise it will skip hashing
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// compare passwords which user enters with the hashed password in the database
userSchema.methods.comparePassword = async function(candidate) {
    try {
        return await bcrypt.compare(candidate, this.password);
    } catch (err) {
        return false;
    }
};

const User = mongoose.model("User", userSchema);
export default User;