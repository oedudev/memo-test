<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('memo_test')->insert([
            'name' => 'test_1',
        ]);
        DB::table('memo_test_card')->insert([
            'memo_test_id' => 1,
            'url' => 'https://randomwordgenerator.com/img/picture-generator/53e4d5424854a914f1dc8460962e33791c3ad6e04e507440702e7bd59e48c5_640.jpg'
        ]);
        DB::table('memo_test_card')->insert([
            'memo_test_id' => 1,
            'url' => 'https://randomwordgenerator.com/img/picture-generator/54e2d7454b54ad14f1dc8460962e33791c3ad6e04e507441722a72d39f4fcc_640.jpg'
        ]);
        DB::table('memo_test_card')->insert([
            'memo_test_id' => 1,
            'url' => 'https://randomwordgenerator.com/img/picture-generator/53e0dd404350a914f1dc8460962e33791c3ad6e04e5074417c2d78d1904fc3_640.jpg'
        ]);
        DB::table('memo_test_card')->insert([
            'memo_test_id' => 1,
            'url' => 'https://randomwordgenerator.com/img/picture-generator/57e6dd464d50a414f1dc8460962e33791c3ad6e04e507749712a72dd9545c1_640.jpg'
        ]);

        DB::table('memo_test')->insert([
            'name' => 'test_2',
        ]);
        DB::table('memo_test_card')->insert([
            'memo_test_id' => 2,
            'url' => 'https://randomwordgenerator.com/img/picture-generator/54e8d74b4b56aa14f1dc8460962e33791c3ad6e04e507440752f72d69e4ec0_640.jpg'
        ]);
        DB::table('memo_test_card')->insert([
            'memo_test_id' => 2,
            'url' => 'https://randomwordgenerator.com/img/picture-generator/fern-2332262_640.jpg'
        ]);
        DB::table('memo_test_card')->insert([
            'memo_test_id' => 2,
            'url' => 'https://randomwordgenerator.com/img/picture-generator/55e5d1404851ac14f1dc8460962e33791c3ad6e04e507749742c78d59f44c3_640.jpg'
        ]);
        DB::table('memo_test_card')->insert([
            'memo_test_id' => 2,
            'url' => 'https://randomwordgenerator.com/img/picture-generator/soap-bubbles-3517247_640.jpg'
        ]);

    }
}
