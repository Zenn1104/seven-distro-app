<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|max:1000',
        ]);

        $product->reviews()->create([
            'user_id' => Auth::id(),
            'rating' => $request->rating,
            'review' => $request->review,
        ]);

        return redirect()->back();
    }
}
