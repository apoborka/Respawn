import { gql } from "@apollo/client";

export const QUERY_ME = gql`
    query me {
        me{
            _id
            username
            savedGames{
                gameId
                played
            }
        }
    }
`;