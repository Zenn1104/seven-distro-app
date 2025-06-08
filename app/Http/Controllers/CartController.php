<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_size_id' => 'required|exists:product_sizes,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $existingCart = Cart::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->where('product_size_id', $request->product_size_id)
            ->first();

        if ($existingCart) {
            $existingCart->increment('quantity', $request->quantity);
        } else {
            Cart::create([
                'user_id' => Auth::id(),
                'product_id' => $request->product_id,
                'product_size_id' => $request->product_size_id,
                'quantity' => $request->quantity,
            ]);
        }

        return back()->with('message', 'Produk ditambahkan ke keranjang!');
    }

    public function index()
    {
        $cartItems = Cart::with(['product.category', 'productSize'])->where('user_id', Auth::id())->get();

        return Inertia::render('Cart/Index', [
            'items' => $cartItems
        ]);
    }

    public function checkout()
    {
        $user = Auth::user();

        // Eager load relasi product dan productSize
        $cartItems = Cart::with(['product', 'productSize'])
            ->where('user_id', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Keranjang kosong.');
        }

        DB::beginTransaction();

        try {
            // Hitung total harga semua item
            $total = $cartItems->sum(function ($item) {
                return $item->product->price * $item->quantity;
            });

            // Buat order utama
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $total,
                'status' => 'pending',
            ]);

            // Simpan detail item order
            foreach ($cartItems as $item) {
                $product = $item->product;
                $size = ProductSize::findOrFail($item->productSize->id);

                // Pastikan stok cukup
                if ($size->stock < $item->quantity) {
                    throw new \Exception("Stok produk {$product->name} ukuran {$size->size} tidak mencukupi.");
                }

                // Simpan order item
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_size_id' => $size->id,
                    'quantity' => $item->quantity,
                    'price' => $product->price,
                    'subtotal' => $product->price * $item->quantity,
                ]);

                $size->decrement('stock', $item->quantity);
            }

            // Kosongkan keranjang
            Cart::where('user_id', $user->id)->delete();

            DB::commit();

            return redirect()->route('orders.success', $order->id)
                ->with('success', 'Checkout berhasil!');
        } catch (\Throwable $e) {
            DB::rollBack();
            return back()->with('error', 'Checkout gagal: ' . $e->getMessage());
        }
    }

    public function count() {
        $count = Auth::check()
            ? Cart::where('user_id', Auth::id())->count()
            : 0;

        return response()->json(['count' => $count]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::findOrFail($id);
        $cart->update(['quantity' => $data['quantity']]);

        return back();
    }

    public function destroy($id)
    {
        Cart::destroy($id);
        return back();
    }
}
