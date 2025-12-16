<?php

namespace App\Models\Course;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CourseCategory extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, HasTranslations;

    protected $fillable = [
        'title',
        'slug',
        'icon',
        'sort',
        'status',
        'description',
        'thumbnail',
        'translations',
    ];

    protected $casts = [
        'translations' => 'array',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function category_children()
    {
        return $this->hasMany(CourseCategoryChild::class);
    }
}
