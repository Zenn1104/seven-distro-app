<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('q');

        // Cari produk berdasarkan nama atau nama kategori
        $products = Product::with('category')
            ->where('name', 'like', '%' . $query . '%')
            ->orWhereHas('category', function ($q) use ($query) {
                $q->where('name', 'like', '%' . $query . '%');
            })
            ->get();

        // Cari kategori berdasarkan nama
        $categories = Category::where('name', 'like', '%' . $query . '%')->get();

        return inertia('Search/Index', [
            'query' => $query,
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}

