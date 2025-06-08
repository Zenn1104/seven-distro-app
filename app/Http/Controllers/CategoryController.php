<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryCreateRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    use AuthorizesRequests;
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Category::class);

        $categories = [];
        if(Auth::user()->role === "customer") {
            $categories = Category::with(['products'])->get();
        } else {
            $categories = Category::get();
        }

        return Inertia::render('Category/Categories', [
            'categories' => $categories,
            'role' => Auth::user()->role,
        ]);
    }

    public function show(Category $category): Response
    {
        $this->authorize('view', $category);

        return Inertia::render('Category/Show', [
            'category' => $category->load('products'), // Menggunakan load() untuk mengambil relasi tanpa find()
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Category::class);

        return Inertia::render('Category/Create');
    }


    public function save(CategoryCreateRequest $request): RedirectResponse
    {
        $this->authorize('create', Category::class);

        $request->validated();

        Category::create($request->all());

        return redirect(route("category.get"))->with('success', 'berhasil menyimpan category.');
    }

    public function edit(Category $category): Response
    {
        $this->authorize('update', $category);

        return Inertia::render('Category/Edit', [
            'category' => $category,
        ]);
    }

    public function update(CategoryUpdateRequest $request, Category $category):RedirectResponse
    {
        $this->authorize('update', $category);

        $request->validated();

        $category->update($request->all());

        return redirect(route("category.get"))->with('success', 'berhasil mengupdate category.');
    }

    public function destroy(string $id): RedirectResponse
    {
        $this->authorize('delete', Category::class);

        $category = Category::find($id);

        $category->delete();

        return back()->with('success', 'Berhasil Menghapus category');
    }
}
