<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Movie\Store;
use App\Http\Requests\Admin\Movie\Update;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use League\CommonMark\Extension\CommonMark\Node\Block\ThematicBreak;
use Throwable;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $movies = Movie::all();
        return inertia('Admin/Dashboard/Index', [
            "movies" => $movies
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia("Admin/Dashboard/FormAddMovie");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Store $request)
    {
        $dataMovie = $request->validated();
        $dataMovie["thumbnail"] = Storage::disk("public")->put("movies", $request->file("thumbnail"));
        $dataMovie["slug"] = Str::slug($request->name);

        try {
            Movie::create($dataMovie);
            $flashMessage = [
                "message" => "Movie Inserted Successfully",
                "type" => "success"
            ];
        } catch (\Throwable $th) {
            if (isset($dataMovie["thumbnail"])) {
                Storage::delete("public/" . $dataMovie["thumbnail"]);
            }
            $flashMessage = [
                "message" => "Movie Inserted Failed",
                "type" => "error"
            ];
        }

        return redirect(route("dashboard.admin.index"))->with($flashMessage);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function show(Movie $movie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $movie = Movie::find($id);
        return inertia("Admin/Dashboard/FormEditMovie", [
            "movie" => $movie
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function update(Update $request, $id)
    {
        $movie = Movie::find($id);
        $oldThumbnail = $movie->thumbnail;
        $dataMovie = $request->validated();
        $deletedThumbnail = false;

        if ($request->file("thumbnail")) {
            $dataMovie["thumbnail"] = Storage::disk("public")->put("movies", $request->file("thumbnail"));
            $deletedThumbnail = true;
        } else {
            $dataMovie["thumbnail"] = $movie->thumbnail;
            $deletedThumbnail = false;
        }
        $dataMovie["slug"] = Str::slug($request->name);

        try {
            $movie->update($dataMovie);
            if ($deletedThumbnail) {
                Storage::delete("public/" . $oldThumbnail);
            }

            $flashMessage = [
                "message" => "Movie Updated Successfully",
                "type" => "success"
            ];
        } catch (\Throwable $th) {
            if ($request->file("thumbnail")) {
                Storage::delete("public/" . $dataMovie["thumbnail"]);
            }

            $flashMessage = [
                "message" => "Movie Updated Failed",
                "type" => "error"
            ];
        }

        return redirect(route("dashboard.admin.index"))->with($flashMessage);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $movie = Movie::findOrFail($id);
            $movie->delete();

            $flashMessage = [
                "message" => "Movie Deleted Successfully",
                "type" => "success"
            ];
        } catch (ThematicBreak $th) {
            $flashMessage = [
                "message" => "Movie Deleted Failed",
                "type" => "error"
            ];
        }

        return redirect(route("dashboard.admin.index"))->with($flashMessage);
    }

    public function viewRestore() {
        $restoreMovies = Movie::onlyTrashed()->get();
        return inertia('Admin/Dashboard/RestoreMovie', [
            "restoreMovies" => $restoreMovies
        ]);
    }

    public function restore($id) {
        try {
            $movie = Movie::onlyTrashed()->findOrFail($id);
            $movie->update(['deleted_at' => null]);

            $flashMessage = [
                "message" => "Movie Restored Successfully",
                "type" => "success"
            ];
        } catch (Throwable $th) {
            $flashMessage = [
                "message" => "Movie not found or already restored",
                "type" => "error"
            ];
        }

        return redirect(route("dashboard.restore.view"))->with($flashMessage);
    }
}
