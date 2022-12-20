import {
  ApolloClient,
  InMemoryCache,
  gql,
  TypedDocumentNode,
} from "@apollo/client";

export interface GameData {
  id: string;
  retries: number;
  number_of_pairs: number;
  state: string;
  memo_test: {
    name: string;
    cards: [
      {
        url: string;
      }
    ];
  };
}

interface CreateGameData {
  createGameSession: GameData;
}

interface GetGameData {
  getGameSessionById: GameData;
}

interface RequestWithId {
  id: string;
}

interface UpdateGameVariables extends RequestWithId {
  retry: number;
}

const random = Math.random();
const memoTestId = Math.floor(random * 2) + 1;

export const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

export const START_GAME: TypedDocumentNode<CreateGameData, any> = gql`
  mutation CreateGameSession {
    createGameSession(
      memo_test_id: ${memoTestId}
      retries: 0
      number_of_pairs: 4
      state: "Started"
    ) {
      id
      retries
      number_of_pairs
      memo_test {
        name
        cards {
          url
        }
      }
    }
  }
`;

export const GET_GAME: TypedDocumentNode<GetGameData, RequestWithId> = gql`
  query GetGameSessionById($id: ID!) {
    getGameSessionById(id: $id) {
      id
      retries
      number_of_pairs
      state
      memo_test {
        cards {
          url
        }
      }
    }
  }
`;

export const UPDATE_GAME: TypedDocumentNode<any, UpdateGameVariables> = gql`
  mutation updateGameSession($id: ID!, $retry: Int!) {
    updateGameSession(id: $id, retries: $retry) {
      id
      retries
      number_of_pairs
      state
    }
  }
`;

export const END_GAME: TypedDocumentNode<any, RequestWithId> = gql`
  mutation endGameSession($id: ID!) {
    endGameSession(id: $id) {
      id
      retries
      number_of_pairs
      state
    }
  }
`;
