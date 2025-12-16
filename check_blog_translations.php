<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Modules\Blog\Models\Blog;

$blog = Blog::latest()->first();

if ($blog) {
    echo "Blog ID: " . $blog->id . "\n";
    echo "Title (Raw): " . $blog->getRawOriginal('title') . "\n";
    echo "Description (Raw): " . substr($blog->getRawOriginal('description'), 0, 50) . "...\n";
    echo "\nTranslations Data:\n";
    echo json_encode($blog->translations, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
} else {
    echo "No blog posts found.\n";
}
