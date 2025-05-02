import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SearchResultPage from "./pages/SearchResult";
import GameDetailsPage from "./pages/GameDetails";
import UserAccountPage from "./pages/UserAccount"; // Import the UserAccountPage
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/game-details/:gameId" element={<GameDetailsPage />} />
          <Route path="/account" element={<UserAccountPage />} /> {/* Add UserAccountPage route */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;