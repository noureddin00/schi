<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "courses: " . \App\Models\Course\Course::count() . PHP_EOL;
echo "instructors: " . \App\Models\Instructor::count() . PHP_EOL;
echo "users (instructor role): " . \App\Models\User::where('role', 'instructor')->count() . PHP_EOL;
