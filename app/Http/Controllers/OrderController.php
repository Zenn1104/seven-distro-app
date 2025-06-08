<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_size_id' => 'required|exists:product_sizes,id',
            'quantity' => 'required|integer|min:1',
        ]);


        $product = Product::findOrFail($validated['product_id']);
        $productSize = ProductSize::findOrFail($validated['product_size_id']);

        if ($productSize->stock < $validated['quantity']) {
            return back()->withErrors(['quantity' => 'Stok ukuran ini tidak mencukupi.']);
        }

        // Buat Order
        $order = Order::create([
            'user_id' => Auth::id(),
            'total_price' => $product->price * $validated['quantity'],
            'status' => 'pending',
        ]);

        // Tambahkan ke OrderItem
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'product_size_id' => $validated['product_size_id'],
            'quantity' => $validated['quantity'],
            'price' => $product->price,
            'subtotal' => $product->price * $validated['quantity'],
        ]);

        $productSize->decrement('stock', $validated['quantity']);

        return redirect()->route('orders.success', $order->id)->with('success', 'Order berhasil dibuat!');
    }

    public function update(Request $request, Order $order)
    {
        $data = $request->validate([
            'status' => 'required|string'
        ]);

        $order->status = $data['status'];
        $order->save();

        return redirect()->back()->with('success', 'status order updated.');
    }

    public function success(Order $order)
    {
        $order->load('items.product');

        return Inertia::render('Order/SuccessOrder', [
            'order' => $order,
        ]);
    }

    public function index()
    {
        $user = Auth::user();

        $orders = Order::with(['user'])
            ->when($user->role === 'customer', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->latest()
            ->get();

        return Inertia::render('Order/Index', [
            'role' => $user->role,
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['items.product', 'user']);

        return Inertia::render('Order/Show', [
            'order' => $order,
            'role' => Auth::user()->role,
        ]);
    }
}
