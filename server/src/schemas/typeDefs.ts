const typeDefs = `
    type User {
        _id: ID
        username: String
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
    }
`;

export default typeDefs