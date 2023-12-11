import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, Link, useForm } from '@inertiajs/react';
import Flickity from "react-flickity-component";
import FeaturedMovie from "@/Components/FeaturedMovie";
import MovieCard from "@/Components/MovieCard";

export default function Dashboard({ auth, featuredMovies, movies}) {
    const flickityOptions = {
        "cellAlign": "left",
        "contain": true,
        "groupCells": 1,
        "wrapAround": false,
        "pageDots": false,
        "prevNextButtons": false,
        "draggable": ">1"
    }

    return (
        <Authenticated auth={auth}>
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
            </Head>
            <Head title="Dashboard" />
            <div className="font-semibold text-[22px] text-black mb-4">Featured Movies</div>
            <Flickity className="gap-[30px]" options={flickityOptions}>

                {/* <!-- Movie Thumbnail --> */}
                {featuredMovies.map( featuredMovie => (
                    <FeaturedMovie
                        name={featuredMovie.name}
                        slug={featuredMovie.slug}
                        category={featuredMovie.category}
                        thumbnail={featuredMovie.thumbnail}
                        rating={featuredMovie.rating}
                        key={featuredMovie.id}
                    />
                ))}
            </Flickity>
            {/* <!-- /Featured --> */}

            {/* <!-- Browser --> */}
            <div className="mt-[50px]">
                <div className="font-semibold text-[22px] text-black mb-4">Browse</div>
                <Flickity options={flickityOptions}>
                    {movies.map( movie => (
                        <MovieCard
                            slug={movie.slug}
                            name={movie.name}
                            category={movie.category}
                            thumbnail={movie.thumbnail}
                            key={movie.id}
                        />
                    ))}
                </Flickity>
            </div>
            {/* <!-- /Browser --> */}

        </Authenticated>
    )
}
