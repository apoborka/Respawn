import User from '../models/user.js';
import { signToken, AuthenticationError } from '../services/auth.js'

interface Game{
    gameId: number;
    played: boolean;
}

interface User {
    _id: string;
    username: string;
    savedGames: Game[];
}

interface Context{
    user?: User;
}

interface UserArgs{
    username: string;
    password: string;
}

interface AddGameArgs{
    input:{
        gameId: number;
        played: boolean;
    }
}

interface RemoveGameArgs{
    gameId:number;
}

interface graphQLinput{
    id: any,
    username: string,
    password: string,
    savedGames: Game[]
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
        saveGame: async(_parent: any, { input }: AddGameArgs, context: Context):Promise<User | null> =>{
            if(context.user){
                const data = await User.findOne({_id: context.user._id}) as unknown as graphQLinput
                const savedGames = data.savedGames
                for (const savedGame of savedGames){
                    if(savedGame.gameId === input.gameId) {
                        if(savedGame.played === false && input.played === true) {
                            await User.findOneAndUpdate(
                                {_id: context.user._id},
                                {$pull: {savedGames: {gameId: savedGame.gameId}}},
                                {new: true}
                            )
                            return await User.findOneAndUpdate(
                                {_id: context.user._id},
                                {
                                    $addToSet: {savedGames: {...input}}
                                },
                                {
                                    new:true,
                                    runValidators: true
                                }
                            );
                        }
                        if(savedGame.played === true){
                            return await User.findOne({_id: context.user._id})
                        }
                    }
                }
                return await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {
                        $addToSet: {savedGames: {...input}}
                    },
                    {
                        new:true,
                        runValidators: true
                    }
                );
            }
            throw AuthenticationError;
        },
        removeGame: async(_parent: any, {gameId}: RemoveGameArgs, context:Context):Promise<User | null> => {
            if(context.user){
                return await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedGames: {gameId: gameId}}},
                    {new: true}
                )
            }
            throw AuthenticationError;
        }
    }
}

export default resolvers;