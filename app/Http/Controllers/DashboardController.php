<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
     // Perkembangan user per bulan (6 bulan terakhir)
        $userGrowth = User::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => Carbon::create()->month($item->month)->format('M'),
                    'users' => $item->total,
                ];
            });

        // Produk paling laku (berdasarkan jumlah order item)
        $topProducts = Order::select('products.name', DB::raw('SUM(order_items.quantity) as sales'))
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->join('products', 'products.id', '=', 'order_items.product_id')
            ->groupBy('products.name')
            ->orderByDesc('sales')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'role' => Auth::user()->role,
            'products' => Product::with('category')->latest()->get(),
            'product_bestseller' => Product::with('category')
            ->withSum('orderItems as total_sold', 'quantity') // <- relasi ke order_items
            ->orderByDesc('total_sold')
            ->get(),
            'userGrowth' => $userGrowth,
            'topProducts' => $topProducts,
        ]);
    }
}
