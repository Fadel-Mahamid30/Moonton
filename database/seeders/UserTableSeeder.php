<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = user::create([
            "name" => "Admin",
            "email" => "admin@gmail.com",
            "password" => bcrypt("admin12345")
        ]);

        $admin->assignRole("admin");
    }
}
