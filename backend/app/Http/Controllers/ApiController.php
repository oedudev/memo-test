<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Memo;




class ApiController extends Controller
{
    public function getAllMemos() {
        return response()->json(Memo::get(),200);
    }

    public function createMemo(Request $request) {
        $memo = new Memo;
        $memo->name = $request->name;
        $memo->url = $request->url;
        $memo->save();

        return response()->json([
            "message" => "memo record created"
        ], 201);
    }

    public function getMemo($id) {
    // logic to get a Memo record goes here
    }

    public function updateMemo(Request $request, $id) {
    // logic to update a Memo record goes here
    }

    public function deleteMemo ($id) {
    // logic to delete a student record goes here
    }
}
