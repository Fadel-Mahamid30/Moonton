import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import ButtonAction from "@/Components/ButtonAction";
import FlashMessage from "@/Components/FlashMessage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Dashboard({ auth, restoreMovies, flashMessage }) {
    const MySwal = withReactContent(Swal);

    const handleDeleteClick = (id) => {
        MySwal.fire({
            title: <p>Are You Sure?</p>,
            text: "Are you sure you want to restore this data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Restore it!",
        }).then((result) => {
            if (result.isConfirmed) {
                put(route("dashboard.restore.data", id));
            }
        });
    };

    const { put } = useForm();

    return (
        <Authenticated auth={auth}>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
            </Head>
            <Head title="Dashboard" />
            <div className="bg-gray-100 p-8">
                <div className="container mx-auto">
                    <div className="items-center flex flex-row justify-between w-full mb-4">
                        <div className="font-semibold text-2xl text-black mb-4">
                            Restore Data Movies
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <Link href={route("dashboard.admin.index")}>
                                <PrimaryButton className="w-fit px-6">
                                    <span className="text-base font-semibold">
                                        Back To Dashboard
                                    </span>
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>
                    {flashMessage?.message && (
                        <FlashMessage
                            message={flashMessage.message}
                            type={flashMessage.type}
                            className="mb-4"
                        />
                    )}

                    <div className="overflow-x-auto bg-white">
                        <table className="table-auto border-slate-500 w-full">
                            <thead>
                                <tr>
                                    <th className="border p-4">No</th>
                                    <th className="border p-4">Name</th>
                                    <th className="border p-4">Category</th>
                                    <th className="border p-4">Rating</th>
                                    <th className="border p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {restoreMovies.map((movie, index) => (
                                    <tr key={index}>
                                        <td className="border p-4 text-center">
                                            {++index}
                                        </td>
                                        <td className="border p-4">
                                            <div className="flex flex-row items-center gap-2">
                                                <div className="w-10 h-10 overflow-hidden rounded-md relative">
                                                    <img
                                                        className="w-full h-full object-cover absolute"
                                                        src={`/storage/${movie.thumbnail}`}
                                                        alt="img-movie"
                                                    />
                                                </div>
                                                <span className="block">
                                                    {movie.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="border p-4">
                                            {movie.category}
                                        </td>
                                        <td className="border p-4">
                                            {movie.rating.toFixed(1)}
                                        </td>
                                        <td className="border p-4">
                                            <div className="w-fit flex flex-row items-center gap-2">
                                                <div
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            movie.id
                                                        )
                                                    }
                                                >
                                                    <ButtonAction variant="secondary">
                                                        <ion-icon
                                                            className="block"
                                                            name="arrow-undo"
                                                        ></ion-icon>
                                                    </ButtonAction>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
