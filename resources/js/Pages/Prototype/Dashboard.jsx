import Authenticated from "../../Layouts/Authenticated/Index";
import { Head, Link, useForm } from '@inertiajs/react';
import Flickity from "react-flickity-component";
import FeaturedMovie from "@/Components/FeaturedMovie";
import MovieCard from "@/Components/MovieCard";

export default function Dashboard() {
    const flickityOptions = {
        "cellAlign": "left",
        "contain": true,
        "groupCells": 1,
        "wrapAround": false,
        "pageDots": false,
        "prevNextButtons": false,
        "draggable": ">1"
    }

    const dataDummy = [
        {
            slug: "movie-1",
            name: "Moview 1",
            category: "Action",
            thumbnail: "/images/featured-1.png",
            rating: 4.9
        },
        {
            slug: "movie-2",
            name: "Moview 2",
            category: "Romance",
            thumbnail: "/images/featured-1.png",
            rating: 4.0
        },
        {
            slug: "movie-3",
            name: "Moview 3",
            category: "Commedy",
            thumbnail: "/images/featured-1.png",
            rating: 4.9
        },
        {
            slug: "movie-4",
            name: "Moview 4",
            category: "Fantasy",
            thumbnail: "/images/featured-1.png",
            rating: 4.9
        },
    ]

    return (
        <Authenticated>
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
            </Head>
            <Head title="Dashboard" />
            <div className="font-semibold text-[22px] text-black mb-4">Featured Movies</div>
            <Flickity className="gap-[30px]" options={flickityOptions}>

                {/* <!-- Movie Thumbnail --> */}
                {dataDummy.map( (v, i) => (
                    <FeaturedMovie 
                        slug={v.slug}
                        name={v.name}
                        category={v.category}
                        thumbnail={v.thumbnail}
                        rating={v.rating}
                        key={i}
                    /> 
                ))}
            </Flickity>
            {/* <!-- /Featured --> */}

            {/* <!-- Browser --> */}
            <div className="mt-[50px]">
                <div className="font-semibold text-[22px] text-black mb-4">Browse</div>
                <Flickity options={flickityOptions}>
                    {[1, 2, 3, 4, 5, 6].map( i => (
                        <MovieCard 
                            slug={`kucing-${i}`}
                            name={`Movie Kucing ${i}`}
                            category="Animal"
                            thumbnail="/images/browse-1.png" 
                            key={i}
                        />
                    ))}
                </Flickity>
            </div>
            {/* <!-- /Browser --> */}

        </Authenticated>
    )
}