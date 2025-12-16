<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get locale from query parameter, cookie, session, or default
        $locale = $request->input('locale') 
            ?? $request->cookie('locale')
            ?? session('locale')
            ?? config('app.locale');

        // Validate locale is supported
        $supported = ['en', 'ar'];
        if (!in_array($locale, $supported)) {
            $locale = config('app.locale');
        }

        // Set application locale
        app()->setLocale($locale);

        // Set locale in session
        session(['locale' => $locale]);

        // Set direction for Arabic
        $direction = $locale === 'ar' ? 'rtl' : 'ltr';

        // Share with Inertia
        \Inertia\Inertia::share([
            'locale' => $locale,
            'direction' => $direction,
            'supported_locales' => [
                ['code' => 'en', 'name' => 'English', 'direction' => 'ltr'],
                ['code' => 'ar', 'name' => 'العربية', 'direction' => 'rtl'],
            ],
        ]);

        // Continue to next middleware / controller
        $response = $next($request);

        // Persist locale and direction in cookies so subsequent requests (and other middleware)
        // can read a consistent value. We set both cookies here.
        if ($response instanceof Response) {
            $response->headers->setCookie(
                cookie('locale', $locale, 60 * 24 * 365)
            );
            $response->headers->setCookie(
                cookie('direction', $direction, 60 * 24 * 365)
            );
        }

        return $response;
    }
}
