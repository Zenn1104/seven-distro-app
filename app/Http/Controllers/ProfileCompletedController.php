<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileCompleteRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class ProfileCompletedController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Profile/Complete', [
            'user' => Auth::user(),
        ]);
    }

    public function update(ProfileCompleteRequest $request): RedirectResponse
    {
        $user = User::find(Auth::id());

        $user->update([
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'postal_code' => $request->postal_code,
            'country' => $request->country,
            'profile_picture' => $request->file('profile_picture') ? $request->file('profile_picture')->store('profile_pictured', 'public') : $user->profile_picture,
        ]);

        return redirect()->route('dashboard')->with('success', 'Profile berhasil diperbarui');
    }
}
