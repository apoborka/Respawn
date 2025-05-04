const typeDefs = `

    type Game {
        gameId: Int
        played: Boolean
    }

    input GameInput{
        gameId: Int
        played: Boolean
    }

    type User {
        _id: ID
        username: String
        savedGames: [Game]
    }
    
    type Auth {
        token: ID!
        user: User
    }


    type Query {
        me: User
    }
    
    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username:String!, password: String!): Auth
        saveGame(input:GameInput!): User
        removeGame(gameId: Int!): User
    }
`;

export default typeDefs