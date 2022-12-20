<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('memo_test_card', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->bigInteger('memo_test_id')->unsigned();
            $table->index('memo_test_id');
            $table->foreign('memo_test_id')->references('id')->on('memo_test')->onDelete('cascade');
            $table->string('url')->default('');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('card_games');
    }
};
