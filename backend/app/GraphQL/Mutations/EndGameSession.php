<?php

namespace App\GraphQL\Mutations;

use App\Models\GameSession;

final class EndGameSession
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $id = $args["id"];
        $game_session = GameSession::find($id);
        $game_session->state = "Completed";
        $game_session->save();

        return $game_session;
    }
}
