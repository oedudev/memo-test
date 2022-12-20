<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MemoTest extends Model
{
    protected $table = 'memo_test';

    protected $fillable = ['name'];

    public function cards(): HasMany
    {
        return $this->hasMany(MemoTestCard::class);
    }
}
