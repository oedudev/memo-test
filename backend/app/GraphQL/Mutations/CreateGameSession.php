<?php

namespace App\GraphQL\Mutations;

use App\Models\GameSession;
use App\Models\MemoTest;

final class CreateGameSession
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $memo_test_id = $args["memo_test_id"];
        $retries = $args["retries"];
        $number_of_pairs = $args["number_of_pairs"];
        $state = $args["state"];

        $memo_test = MemoTest::findOrFail($memo_test_id);

        $game_session = new GameSession();
        $game_session->retries = $retries;
        $game_session->number_of_pairs = $number_of_pairs;
        $game_session->state = $state;

        $game_session->memo_test()->associate($memo_test);
        $game_session->save();

        return $game_session;
    }
}
