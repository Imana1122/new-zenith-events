<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'logo',
        'background_image'
    ];
}
