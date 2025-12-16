<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerifyEmailController extends Controller
{
    /**
     * Mark the user's email address as verified using a signed link (auth not required).
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $adminDashboard = route('dashboard', absolute: false) . '?verified=1';
        $studentDashboard = route('student.index', ['tab' => 'courses'], absolute: false) . '?verified=1';

        $user = User::findOrFail($request->route('id'));

        if (! hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            throw new AuthorizationException();
        }

        // Ensure the request is still signed/valid (middleware handles most cases)
        if (! $request->hasValidSignature()) {
            throw new AuthorizationException();
        }

        if ($user->hasVerifiedEmail()) {
            if ($user->role === UserType::STUDENT->value) {
                return redirect()->intended($studentDashboard);
            }

            return redirect()->intended($adminDashboard);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        // Log the user in so they land in the right dashboard after verification
        if (! Auth::check() || Auth::id() !== $user->id) {
            Auth::logout();
            Auth::login($user);
        }

        if ($user->role === UserType::STUDENT->value) {
            return redirect()->intended($studentDashboard);
        }

        return redirect()->intended($adminDashboard);
    }
}
