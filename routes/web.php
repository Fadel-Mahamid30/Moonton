<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Routing\RouteGroup;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PHPUnit\TextUI\XmlConfiguration\Group;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\MovieController;
use App\Http\Controllers\Admin\MovieController as AdminMovieController;
use App\Http\Controllers\User\SubscriptionPlanController;
use App\Models\Movie;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// MIDTRANS
Route::post("midtrans/notification", [SubscriptionPlanController::class, "midtransCallback"]);
Route::get("cek", [MovieController::class, "cek"]);
Route::redirect('/', '/login');

Route::middleware(["auth", "role:user"])->prefix("dashboard")->name("user.dashboard.")->group(function () {
    Route::get("/", [DashboardController::class, "index"])->name('index');
    Route::get("/movie/{movie:slug}", [MovieController::class, "show"])->name('movie.show')->middleware("checkUserSubscription:true");
    Route::get("/subscription-plan", [SubscriptionPlanController::class, "index"])->name('subscriptionPlan.index')->middleware("checkUserSubscription:false");
    Route::post("/subscription-plan/{subscriptionPlan}/user-subscribe", [SubscriptionPlanController::class, "userSubscribe"])->name('subscriptionPlan.userSubscribe')->middleware("checkUserSubscription:false");
});

Route::middleware(["auth", "role:admin"])->prefix("dashboard")->name("dashboard.")->group(function () {
    Route::resource('admin', AdminMovieController::class);

    Route::get("restore", [AdminMovieController::class, "viewRestore"])->name("restore.view");
    Route::put("restore/{id}", [AdminMovieController::class, "restore"])->name("restore.data");
});

Route::prefix('prototype')->name("prototype.")->group(function () {
    Route::get('/login', function() {
        return Inertia::render("Prototype/Login");
    })->name("login");
    Route::get('/register', function () {
        return Inertia::render("Prototype/Register");
    })->name("register");
    Route::get('/dashboard', function () {
        return Inertia::render("Prototype/Dashboard");
    })->name("dashboard");
    Route::get('/subscriptionplan', function () {
        return Inertia::render("Prototype/SubscriptionPlan");
    })->name("subscriptionplan");
    Route::get('/movie/{slug}', function () {
        return Inertia::render("Prototype/Movie/Show");
    })->name("movie.show");
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
