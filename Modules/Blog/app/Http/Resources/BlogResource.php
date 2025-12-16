<?php

namespace Modules\Blog\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->getTranslated('title') ?: $this->getRawOriginal('title'),
            'slug' => $this->slug,
            'description' => $this->getTranslated('description') ?: $this->getRawOriginal('description'),
            'keywords' => $this->getTranslated('keywords') ?: $this->getRawOriginal('keywords'),
            'thumbnail' => $this->thumbnail,
            'banner' => $this->banner,
            'status' => $this->status,
            'user_id' => $this->user_id,
            'blog_category_id' => $this->blog_category_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            // Relations
            'user' => $this->whenLoaded('user'),
            'category' => $this->whenLoaded('category'),
            'comments' => $this->whenLoaded('comments'),
            
            // Counts
            'likes_count' => $this->when(isset($this->likes_count), $this->likes_count),
            'dislikes_count' => $this->when(isset($this->dislikes_count), $this->dislikes_count),
            'comments_count' => $this->when(isset($this->comments_count), $this->comments_count),
            
            // Computed attributes
            'excerpt' => $this->excerpt,
            'reading_time' => $this->reading_time,
        ];
    }
}
