<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$system = app('system_settings');
echo "system_settings fields:\n";
print_r($system?->fields);

// list media for settings model
$setting = \App\Models\Setting::where('type','system')->first();
if ($setting) {
    echo "\nMedia attached to settings:\n";
    foreach ($setting->getMedia() as $m) {
        echo "id: {$m->id}, name: " . ($m->getCustomProperty('name') ?? 'null') . ", file: {$m->file_name}, url: {$m->getFullUrl()}\n";
    }
} else {
    echo "No system setting found\n";
}

// check public/storage
$link = __DIR__ . '/../public/storage';
echo "\nPublic storage symlink exists: " . (file_exists($link) ? 'yes' : 'no') . "\n";
