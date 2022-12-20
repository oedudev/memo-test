<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class MemoTestCard extends Model
{
    protected $table = 'memo_test_card';

    protected $fillable = ['url'];

    public function memo_test(): BelongsTo
    {
        return $this->belongsTo(MemoTest::class, 'memo_test_id', 'id');
    }
}
