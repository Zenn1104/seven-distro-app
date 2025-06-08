<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCreateOrUpdateRequest;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductSize;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{

    public function index(): Response
    {
        $products = Product::with(['category', 'sizes'])->latest()->get();
        $role = Auth::user()->role;
        return Inertia::render('Products/Index', compact('products', 'role'));
    }

    public function show(Product $product): Response
    {
        $product->load(['category', 'reviews.user', 'sizes']);

        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();

        return Inertia::render('Products/Show', compact('product', 'relatedProducts'));
    }

    public function create(): Response
    {
        $categories = Category::all();
        return Inertia::render('Products/Create', compact('categories'));
    }

    public function store(ProductCreateOrUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            $product = Product::create([
                'category_id' => $validated['category_id'],
                'name' => $validated['name'],
                'description' => $validated['description'],
                'price' => $validated['price'],
                'stock' => 0, // akan dihitung dari sizes
                'image_url' => $request->file('image_url')
                    ? $request->file('image_url')->store('products', 'public')
                    : '/images/no-image.png',
            ]);

            // Simpan ukuran
            $totalStock = 0;
            foreach ($request->input('sizes', []) as $sizeData) {
                $product->sizes()->create([
                    'size' => $sizeData['size'],
                    'stock' => $sizeData['stock'],
                ]);
                $totalStock += $sizeData['stock'];
            }

            $product->update(['stock' => $totalStock]);

            DB::commit();
            return redirect()->route("products.index")->with("success", "Successfully Created Product.");
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed: ' . $e->getMessage());
        }
    }


    public function edit(Product $product): Response
    {
        $categories = Category::all();
        $product->load('sizes');
        return Inertia::render('Products/Edit', compact('product', 'categories'));
    }

    public function update(ProductCreateOrUpdateRequest $request, Product $product): RedirectResponse
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            if ($request->hasFile('image_url')) {
                if ($product->image_url && Storage::exists($product->image_url)) {
                    Storage::delete($product->image_url);
                }
                $validated['image_url'] = $request->file('image_url')->store('products', 'public');
            }

            $product->update($validated);

            // Hapus semua sizes lama dan buat ulang
            $product->sizes()->delete();

            $totalStock = 0;
            foreach ($request->input('sizes', []) as $sizeData) {
                $product->sizes()->create([
                    'size' => $sizeData['size'],
                    'stock' => $sizeData['stock'],
                ]);
                $totalStock += $sizeData['stock'];
            }

            $product->update(['stock' => $totalStock]);

            DB::commit();
            return redirect()->route('products.index')->with('success', 'Product updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('products.index')->with('error', 'Failed to update product. Error: ' . $e->getMessage());
        }
    }

    public function addStock(Request $request, ProductSize $size): RedirectResponse
    {
         $data = $request->validate([
            'stock' => 'required|integer|min:1',
        ]);

        // Mulai transaksi untuk menjaga konsistensi data
        DB::beginTransaction();

        try {
            // Tambahkan stok baru ke stok saat ini
            $size->stock += $data['stock'];
            $size->save();

            // Commit jika berhasil
            DB::commit();

            return redirect()->route('products.index')->with('success', 'Stock updated successfully.');
        } catch (\Exception $e) {
            // Rollback jika terjadi error
            DB::rollBack();

            return redirect()->route('products.index')->with('error', 'Failed to update stock. Error: ' . $e->getMessage());
        }
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();
        return redirect()->back();
    }
}
