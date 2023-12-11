<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SubscriptionPlan;

class SubscriptionPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subscription = [
            [
                "name" => "Basic",
                "price" => 2000000,
                "active_peroid_in_months" => 3,
                "features" => json_encode(["Feature 1", "Feature 2", "Feature 3"])
            ],
            [
                "name" => "Premium",
                "price" => 9000000,
                "active_peroid_in_months" => 3,
                "features" => json_encode(["Feature 1", "Feature 2", "Feature 3"])
            ],
        ];

        SubscriptionPlan::insert($subscription);
    }
}
