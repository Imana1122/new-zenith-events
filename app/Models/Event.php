<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'price',
        'address',
        'start_date',
        'end_date',
        'workshop',
        'vat',
        'imagePath',
        'description',
        'eventHostDetails'
    ];


    // Add any additional methods or relationships here

    public function trainers()
    {
        return $this->belongsToMany(Trainer::class, 'events_trainers', 'event_id', 'trainer_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'eventId'); // 'eventId' is the foreign key in the bookings table
    }
}
