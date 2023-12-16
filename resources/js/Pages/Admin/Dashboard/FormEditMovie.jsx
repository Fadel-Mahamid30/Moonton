import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated/Index";
import Label from "@/Components/InputLabel";
import Input from "@/Components/TextInput";
import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import Button from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";
import { Link, Head, useForm, router } from "@inertiajs/react";

export default function FormEditMovie({ auth, movie }) {
    const { data, setData, processing, errors } = useForm({
        ...movie
    });

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.thumbnail === movie.thumbnail) {
            delete data.thumbnail;
        }

        router.post(route("dashboard.admin.update", movie.id), {
            _method: "PUT",
            ...data,
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Dashboard" />
            <div className="font-semibold text-[22px] text-black mb-4">
                Edit Movie: {movie.name}
            </div>
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                className="p-4 sm:p-8 bg-slate-100 max-w-2xl shadow sm:rounded-lg flex flex-col gap-6 mb-6"
            >
                <div>
                    <Label forInput="name">Movie Title</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={movie.name}
                        placeholder="Movie Title"
                        isError={errors.name ? true : false}
                        onChange={handleOnChange}
                        variant="primary-outline"
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <Label forInput="category">Category</Label>
                    <Input
                        type="text"
                        name="category"
                        id="category"
                        value={movie.category}
                        placeholder="Category"
                        isError={errors.category ? true : false}
                        onChange={handleOnChange}
                        variant="primary-outline"
                        required
                    />
                    <InputError message={errors.category} className="mt-2" />
                </div>
                <div>
                    <Label forInput="video_url">Video Url</Label>
                    <Input
                        type="url"
                        name="video_url"
                        id="video_url"
                        value={movie.video_url}
                        placeholder="Video Url"
                        isError={errors.video_url ? true : false}
                        onChange={handleOnChange}
                        variant="primary-outline"
                        required
                    />
                    <InputError message={errors.video_url} className="mt-2" />
                </div>
                <div>
                    <Label forInput="thumbnail">Thumbnail</Label>
                    <div className="w-20 h-20 bg-slate-900 rounded-md mb-2 overflow-hidden relative">
                        <img
                            src={`/storage/${movie.thumbnail}`}
                            className="w-full h-full absolute object-cover"
                            alt="img-movie"
                        />
                    </div>
                    <FileInput
                        id="thumbnail"
                        nameInput="thumbnail"
                        htmlFor="thumbnail"
                        onFileChange={handleOnChange}
                    />
                </div>
                <div>
                    <Label forInput="rating">Rating</Label>
                    <Input
                        type="number"
                        name="rating"
                        id="rating"
                        value={movie.rating}
                        placeholder={0}
                        isError={errors.rating ? true : false}
                        onChange={handleOnChange}
                        variant="primary-outline"
                        required
                    />
                    <InputError message={errors.rating} className="mt-2" />
                </div>
                <div className="block">
                    <label className="flex items-center">
                        <Checkbox
                            name="is_featured"
                            onChange={(e) =>
                                setData("is_featured", e.target.checked)
                            }
                            checked={movie.is_featured}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Is Featured
                        </span>
                    </label>
                </div>
                <div className="w-full flex flex-row-reverse justify-start items-center gap-2">
                    <Button
                        className="px-6"
                        sizeWidth="w-fit"
                        type="submit"
                        disabled={processing}
                    >
                        <span className="text-base font-semibold">
                            Save Data
                        </span>
                    </Button>
                    <Link href={route("dashboard.admin.index")}>
                        <Button
                            className="px-6"
                            sizeWidth="w-fit"
                            type="button"
                            variant="secondary"
                        >
                            <span className="text-base font-semibold">
                                Back
                            </span>
                        </Button>
                    </Link>
                </div>
            </form>
        </Authenticated>
    );
}
