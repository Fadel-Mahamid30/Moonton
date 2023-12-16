<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\UserSubscription;
use Illuminate\Support\Facades\Auth;

class MovieController extends Controller
{
    public function show(Movie $movie)  {
        return inertia("User/Dashboard/Movie/Show", [
            "movie" => $movie
        ]);
    }

    public function cek() {
        $movie = UserSubscription::where("payment_status", "paid")->latest();
        return $data = [
            "cek" => Auth::user()->LastActiveUserSubscription
        ];
    }
}
