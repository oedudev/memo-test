<?php

namespace App\GraphQL\Mutations;

use App\Models\GameSession;
use App\Models\MemoTest;
use App\Models\MemoTestCard;

final class AddCardToMemoTest
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $memo_test_card_url = $args["url"];
        $memo_test_id = $args["memo_test_id"];
        $memo_test = MemoTest::find($memo_test_id);

        if ($memo_test == null) {
            return null;
        }


        $memo_test_card = new MemoTestCard();
        $memo_test_card->url = $memo_test_card_url;
        $memo_test_card->memo_test()->associate($memo_test);
        $memo_test_card->save();

        return $memo_test;
    }
}
