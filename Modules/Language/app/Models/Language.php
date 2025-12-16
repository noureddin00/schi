<?php

namespace Modules\Language\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $fillable = [
        'name',
        'code',
        'flag',
        'nativeName',
        'is_active',
        'is_default',
    ];

    protected $casts = [
        'is_active'  => 'boolean',
        'is_default' => 'boolean',
    ];

    protected $appends = ['native_name', 'rtl'];

    public function getNativeNameAttribute()
    {
        return $this->attributes['nativeName'] ?? $this->attributes['name'] ?? 'Unknown';
    }

    public function getRtlAttribute()
    {
        return in_array($this->code, ['ar', 'he', 'fa', 'ur']);
    }

    public function properties()
    {
        return $this->hasMany(LanguageProperty::class);
    }
}
