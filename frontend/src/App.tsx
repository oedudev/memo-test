import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import {
  END_GAME,
  GameData,
  GET_GAME,
  START_GAME,
  UPDATE_GAME,
} from "./services/api";

interface Card {
  id: number;
  url: string;
}

type RandomizeCardsProps = (cards: [{ url: string }] | undefined) => Card[];

const MAX_OF_POINTS = 5;

function App() {
  const toast = useToast();

  const [lastGame, setLastGame] = useState<GameData>({} as GameData);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [gameId, setGameId] = useState<string>("");
  const [retry, setRetry] = useState<number>(0);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [currentPontuation, setCurrentPontuation] =
    useState<number>(MAX_OF_POINTS);

  const [startGame] = useMutation(START_GAME);
  const { refetch: getGame } = useQuery(GET_GAME);
  const [updateGame] = useMutation(UPDATE_GAME);
  const [endGame] = useMutation(END_GAME);

  const isGameRunning = cards.length > 0;

  const randomizeCards: RandomizeCardsProps = (cards) => {
    let auxCards =
      cards?.map((card, index) => {
        return {
          id: index,
          url: card.url,
        };
      }) || [];
    auxCards = [...auxCards, ...auxCards];
    auxCards.sort(() => Math.random() - 0.5);

    return auxCards;
  };

  const handleStartGame = async () => {
    toast({
      status: "loading",
      title: "Starting the game...",
      description: "Please, wait",
      duration: 4000,
      isClosable: true,
    });
    setFlippedCards([]);
    setIsGameFinished(false);
    setRetry(0);
    setPoints(0);
    setCurrentPontuation(MAX_OF_POINTS);

    try {
      const res = await startGame();

      setCards(randomizeCards(res.data?.createGameSession.memo_test.cards));
      setGameId(res.data?.createGameSession?.id || "");

      toast({
        status: "success",
        title: "Game started!",
        description: "Click on the cards to play",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFlipCard = (index: number) => {
    const numberOfFlippedCards = flippedCards.length;
    const indexInFlippedCards = flippedCards.indexOf(index);
    if (
      indexInFlippedCards > -1 &&
      (cards[flippedCards[indexInFlippedCards]]?.url ===
        cards[flippedCards[indexInFlippedCards - 1]]?.url ||
        cards[flippedCards[indexInFlippedCards]]?.url ===
          cards[flippedCards[indexInFlippedCards + 1]]?.url)
    )
      return;
    const auxFlippedCards = [...flippedCards];

    if (!auxFlippedCards.includes(index)) {
      if (
        (numberOfFlippedCards % 2 === 0 &&
          cards[auxFlippedCards[numberOfFlippedCards - 2]]?.url ===
            cards[auxFlippedCards[numberOfFlippedCards - 1]]?.url) ||
        numberOfFlippedCards % 2 !== 0 ||
        numberOfFlippedCards === 0
      ) {
        auxFlippedCards.push(index);
        handleSumPoints(cards[index], auxFlippedCards);
        handleUpdateGame(auxFlippedCards.length === cards.length);
        setRetry((oldState) => oldState + 1);
      }
    } else {
      const indexInArray = auxFlippedCards.indexOf(index);
      auxFlippedCards.splice(indexInArray, 1);
    }

    setFlippedCards(auxFlippedCards);
  };

  const handleUpdateGame = async (finishGame: boolean) => {
    try {
      await updateGame({ variables: { retry: retry + 1, id: gameId } });
      if (finishGame) await handleEndGame();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEndGame = async () => {
    try {
      toast({
        status: "success",
        title: "Congratulations!",
        description: "You finished the game",
        duration: 5000,
        isClosable: true,
      });

      localStorage.removeItem("@MemoTest:FlippedCards");
      localStorage.removeItem("@MemoTest:Points");
      localStorage.removeItem("@MemoTest:CurrentPontuation");
      localStorage.removeItem("@MemoTest:Cards");
      localStorage.removeItem("@MemoTest:ID");

      await endGame({ variables: { id: gameId } });
      setIsGameFinished(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSumPoints = (
    lastCardFlipped: Card,
    flippedCardsArray: number[]
  ) => {
    const isPaired =
      cards.filter(
        (card, index) =>
          card.id === lastCardFlipped.id && flippedCardsArray.includes(index)
      ).length === 2;

    if (isPaired) {
      setPoints((oldState) => oldState + currentPontuation);
      setCurrentPontuation(MAX_OF_POINTS);
    } else if (flippedCardsArray.length % 2 === 0 && currentPontuation > 1)
      setCurrentPontuation((oldState) => oldState - 1);
  };

  const handleRestartGame = () => {
    setFlippedCards(
      JSON.parse(localStorage.getItem("@MemoTest:FlippedCards") || "[]")
    );
    setPoints(Number(localStorage.getItem("@MemoTest:Points")));
    setCurrentPontuation(
      Number(localStorage.getItem("@MemoTest:CurrentPontuation")) ||
        MAX_OF_POINTS
    );
    setIsGameFinished(false);
    setGameId(lastGame.id);
    setRetry(lastGame.retries);
    setCards(JSON.parse(localStorage.getItem("@MemoTest:Cards") || "[]"));
  };

  const handleGetLastGame = async () => {
    const lastGameId = localStorage.getItem("@MemoTest:ID");
    if (!lastGameId) return;

    const lastGame = await getGame({ id: lastGameId });
    if (lastGame.data?.getGameSessionById.state !== "Completed") {
      toast({
        status: "warning",
        title: "One incomplete game was found!",
        description: "Press CONTINUE to resume",
        duration: 5000,
        isClosable: true,
      });

      setLastGame(lastGame.data?.getGameSessionById || ({} as GameData));
    }
  };

  useEffect(() => {
    if (!isGameRunning) return;
    localStorage.setItem("@MemoTest:Cards", JSON.stringify(cards));
    localStorage.setItem("@MemoTest:ID", gameId);
    localStorage.setItem("@MemoTest:Points", String(points));
    localStorage.setItem(
      "@MemoTest:CurrentPontuation",
      String(currentPontuation)
    );
    localStorage.setItem(
      "@MemoTest:FlippedCards",
      JSON.stringify(flippedCards)
    );
  }, [cards, gameId, points, currentPontuation, flippedCards]);

  useEffect(() => {
    handleGetLastGame();
  }, []);

  return (
    <Flex
      w="100vw"
      h="100vh"
      bg="#404258"
      alignItems="center"
      flexDirection="column"
      minWidth="1280px"
    >
      <Flex
        h="150px"
        w="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading
          fontSize="30px"
          lineHeight="30px"
          margin="0"
          mb="12px"
          color="#fff"
        >
          Memo Game
        </Heading>
        <Text fontSize="18px" margin="0" mb="8px" color="#fff">
          Score: {points} points
        </Text>
        <Flex flexDirection="row">
          {(!isGameRunning || isGameFinished) && (
            <Button bg="#48BB78" onClick={handleStartGame}>
              <Text fontSize="16px" margin="0" color="#fff">
                START GAME
              </Text>
            </Button>
          )}
          {lastGame?.state === "Started" && !isGameRunning && (
            <Button ml="6px" bg="#4FD1C5" onClick={handleRestartGame}>
              <Text fontSize="16px" margin="0" color="#fff">
                CONTINUE GAME
              </Text>
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex
        w="850px"
        h="550px"
        bg="#50577A"
        borderRadius="20px"
        alignItems="center"
        justifyContent="center"
      >
        <SimpleGrid columns={4} spacing="60px">
          {cards.map((card, index) => (
            <Card
              key={index}
              imageUrl={card.url}
              isFlipped={flippedCards.includes(index)}
              onClick={() => handleFlipCard(index)}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default App;
