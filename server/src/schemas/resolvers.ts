import User from '../models/user.js';
import { signToken, AuthenticationError } from '../services/auth.js'

interface User {
    _id: string;
    username: string;
}

interface Context{
    user?: User;
}

interface UserArgs{
    username: string;
    password: string;
}


const resolvers = {
    Query: {
        me: async(_parent: any, _args: any, context: Context): Promise<User | null> => {
            if(context.user){
                return await User.findOne({ _id: context.user._id});
            }
            throw AuthenticationError;
        }
    },
    Mutation: {
        addUser: async(_parent: any, { username, password }: UserArgs):Promise<{ token: string; user: User }> => {
            const user = await User.create({username, password}) as User;
            const token = signToken(user.username,user._id);
            return {token, user}
        },
        login: async(_parent: any, {username, password}: {username: string, password: string}): Promise<{ token: string; userOut: User }> =>{
            const user = await User.findOne({username});
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw AuthenticationError;
            }
            const token = signToken(user.username, user._id);
            const userOut = user as User;
            return { token, userOut }
        },
    }
}

export default resolvers;