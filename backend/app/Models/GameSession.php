<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GameSession extends Model
{
    protected $table = 'game_session';

    protected $fillable = ['retries', 'number_of_pairs', 'state'];

    public function memo_test(): BelongsTo
    {
        return $this->belongsTo(MemoTest::class,'memo_test_id', 'id');
    }
}
