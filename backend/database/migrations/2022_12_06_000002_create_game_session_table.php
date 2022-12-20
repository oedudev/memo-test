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
        Schema::create('game_session', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->bigInteger('memo_test_id')->unsigned();
            $table->index('memo_test_id');
            $table->foreign('memo_test_id')->references('id')->on('memo_test')->onDelete('cascade');
            $table->integer('retries')->default(0);
            $table->integer('number_of_pairs')->default(0);
            $table->string('state');
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
