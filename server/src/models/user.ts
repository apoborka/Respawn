import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface GameDocument extends Document {
    gameId: number;
    played: boolean;
}

const GameSchema = new Schema<GameDocument>({
    gameId:{
        type: Number,
    },
    played:{
        type: Boolean
    },
    },
    {
        _id:false
    }
)


interface UserDocument extends Document {
    id: string;
    username: string;
    password: string;
    savedGames: GameDocument[];
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
        savedGames: [GameSchema],
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