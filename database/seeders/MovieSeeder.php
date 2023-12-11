<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Movie;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $movie = [
            [
                "name" => "Best Nightcore Gaming Music Mix 2023 1 Hour",
                "slug" => "best-nightcore-gaming-music-mix-2023-1-hour",
                "category" => "Musik Gaming",
                "video_url" => "https://www.youtube.com/watch?v=ozKMuf2BbIs",
                "thumbnail" => "https://unsplash.com/photos/person-sitting-on-gaming-chair-while-playing-video-game-Mf23RF8xArY",
                "rating" => "4.5",
                "is_featured" => 1
            ],
            [
                "name" => "Best EDM remix tiktok music for tik tok mix",
                "slug" => "best-edm-remix-tiktok-music-for-tik-tok-mix",
                "category" => "Musik Remix",
                "video_url" => "https://www.youtube.com/watch?v=RrltsgoIBQY",
                "thumbnail" => "https://unsplash.com/photos/a-close-up-of-a-computer-4x_yDlANVhs",
                "rating" => "4.3",
                "is_featured" => 0
            ],
            [
                "name" => "Nightcore: Why Do I",
                "slug" => "nightcore:-Why-Do-I",
                "category" => "Musik EDM",
                "video_url" => "https://www.youtube.com/watch?v=qkz0dDynIto&t=59s",
                "thumbnail" => "https://unsplash.com/photos/person-playing-dj-mixer-in-dark-room-IJRMI1BGPbw",
                "rating" => "4.1",
                "is_featured" => 0
            ],
            [
                "name" => "Justin Bieber (BABY)",
                "slug" => "justin-bieber-(baby)",
                "category" => "Musik Romance",
                "video_url" => "https://www.youtube.com/watch?v=_R92CP82-vY&list=RDMM&start_radio=1&rv=ozKMuf2BbIs",
                "thumbnail" => "https://unsplash.com/photos/heart-shaped-pink-sparklers-photography-hBzrr6m6-pc",
                "rating" => "4.0",
                "is_featured" => 0
            ],
        ];

        Movie::insert($movie);
    }
}
