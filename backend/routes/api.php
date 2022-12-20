<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/memos', [ApiController::class, 'getAllMemos']);    
Route::post('/memos', [ApiController::class, 'createMemo']);


Route::get('memos/{id}', 'ApiController@getMemo');
Route::put('memos/{id}', 'ApiController@updateMemo');
Route::delete('memos/{id}','ApiController@deleteMemo');
