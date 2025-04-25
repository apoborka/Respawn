import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
    id: string;
    username: string;
    password: string;
    isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    }
)

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password,saltRounds)
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

const User = model<UserDocument>('User', userSchema);

export default User;