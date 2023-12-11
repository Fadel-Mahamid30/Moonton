<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubscriptionPlan;
use App\Models\User;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class SubscriptionPlanController extends Controller
{
    public function index() {
        $subscriptionPlans = SubscriptionPlan::all();
        return inertia("User/Dashboard/SubscriptionPlan", [
            "subscriptionPlans" => $subscriptionPlans
        ]);
    }

    public function userSubscribe(Request $request, SubscriptionPlan $subscriptionPlan) {
        // ["user_id", "subscription_plan_id", "price", "experied_date", "payment_status", "snapToken"];
        // ["name", "price", "active_peroid_in_months", "features"];

        $data = [
            "user_id" => Auth::user()->id,
            "subscription_plan_id" => $subscriptionPlan->id,
            "price" => $subscriptionPlan->price,
            "experied_date" => Carbon::now()->addMonth($subscriptionPlan->active_peroid_in_months),
            "payment_status" => "paid"
        ];

        UserSubscription::create($data);
        return redirect(route("user.dashboard.index"));

    }

    // public function tes() {
    //     $tes = Auth::user()->getActiveAttribute();
    //     return $tes;
    // }
}
