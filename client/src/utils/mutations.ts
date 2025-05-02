import { gql } from "@apollo/client"

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
            token
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`;

export const ADD_GAME = gql`
    mutation saveGame($input: GameInput!) {
        saveGame(input: $input) {
            _id
            username
            savedGames{
                gameId
                played
            }
        }
    }
`;

export const REMOVE_GAME = gql`
    mutation removeGame($gameId: Int!) {
        removeGame(gameId: $gameId){
            _id
            username
            savedGames{
                gameId
                played
            }
        }
    }
`;