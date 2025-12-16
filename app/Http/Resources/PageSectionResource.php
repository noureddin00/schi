<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageSectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Check if translations exist, if not, use original values
        $hasTranslations = !empty($this->translations);
        
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'sort' => $this->sort,
            
            // Use translated fields if available, otherwise use original
            'title' => $hasTranslations ? $this->getTranslated('title') : $this->title,
            'sub_title' => $hasTranslations ? $this->getTranslated('sub_title') : $this->sub_title,
            'description' => $hasTranslations ? $this->getTranslated('description') : $this->description,
            
            // Non-translatable fields
            'thumbnail' => $this->thumbnail,
            'background_image' => $this->background_image,
            'background_color' => $this->background_color,
            'video_url' => $this->video_url,
            'flags' => $this->flags,
            'properties' => $this->properties,
            'active' => $this->active,
            'page_id' => $this->page_id,
            
            // Include all translations for admin panel
            'translations' => $this->when(
                $request->user() && $request->user()->type === 'admin',
                $this->getAllTranslations()
            ),
            
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
