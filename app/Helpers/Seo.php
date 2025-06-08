<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;

class Seo
{
    public static function meta(): array
    {
        $routeName = Route::currentRouteName();
        $routeParams = Route::current()?->parameters() ?? [];

        // Default values
        $default = [
            'title' => 'Seven Distro | Fashion Kekinian',
            'description' => 'Tampil keren dengan koleksi terbaru dari Seven Distro.',
            'image' => asset('storage/images/seven-distro-logo.png'),
            'url' => url(Request::path()),
            'type' => 'website',
        ];

        $seo = [
            'home' => [
                'title' => 'Beranda | Seven Distro',
                'description' => 'Selamat datang di Seven Distro. Temukan fashion terbaik di sini!',
                'image' => asset('storage/images/image-1.jpg'),
                'url' => url('/'),
                'type' => 'website',
            ],
            'dashboard' => [
                'title' => 'Dashboard | Seven Distro',
                'description' => 'Kelola toko dan pesanan Anda dari satu tempat.',
                'image' => asset('storage/images/image-2.jpg'),
                'url' => url('/dashboard'),
            ],
            'products.index' => [
                'title' => 'Produk | Seven Distro',
                'description' => 'Lihat koleksi produk terbaru dan terbaik kami.',
                'image' => asset('storage/images/image-3.jpg'),
                'url' => url('/products'),
            ],
            'products.show' => function ($params) {
                $product = $params['product'] ?? null;
                return [
                    'title' => ($product->name ?? 'Detail Produk') . ' | Seven Distro',
                    'description' => $product->description ?? 'Lihat detail produk kami.',
                    'image' => asset('storage/' . $product->image_url ?? 'images/image-2.jpg'),
                    'url' => url("/products/{$product->id}"),
                ];
            },
            'categories.index' => [
                'title' => 'Kategori | Seven Distro',
                'description' => 'Jelajahi kategori produk kami yang lengkap.',
                'image' => asset('storage/images/image-1.jpg'),
                'url' => url('/categories'),
            ],
            'categories.show' => function ($params) {
                $category = $params['category'] ?? null;
                return [
                    'title' => ($category->name ?? 'Kategori') . ' | Seven Distro',
                    'description' => 'Produk dalam kategori ' . ($category->name ?? 'ini') . '.',
                    'image' => asset('storage/' . $category->image_url ?? 'images/image-2.jpg'),
                    'url' => url("/categories/{$category->id}"),
                ];
            },
        ];

        // Ambil dari array statis atau closure
        $current = $seo[$routeName] ?? $default;

        if (is_callable($current)) {
            return array_merge($default, $current($routeParams));
        }

        return array_merge($default, $current);
    }
}
