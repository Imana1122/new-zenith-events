<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Event;
use App\Models\Trainer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class SearchController extends Controller
{

    public function searchEvents(Request $request)
    {

        $query = $request->input('query');

        $events = Event::with('trainers')
            ->where('title', 'LIKE', "%$query%")
            ->orWhere('id', 'LIKE', "%$query%")
            ->get();

        $now = Carbon::now('Asia/Kathmandu');


        $finishedEvents=[];
        $ongoingEvents = [];
        $upcomingEvents = [];

        foreach ($events as $event) {
            $startDateTime = Carbon::parse($event->start_date, 'Asia/Kathmandu');
            $endDateTime = Carbon::parse($event->end_date, 'Asia/Kathmandu');

            if ($endDateTime->lessThan($now)) {
                // Event is finished
                $finishedEvents[] = $event;

            }elseif ($startDateTime->lessThan($now) && $endDateTime->greaterThan($now)) {
                // Event is ongoing
                $ongoingEvents[] = $event;
            } elseif ($startDateTime->greaterThan($now)) {
                // Event is upcoming
                $upcomingEvents[] = $event;
            }
        }

        return response()->json([
            'All' => $events,
            'Upcoming' => $upcomingEvents,
            'Ongoing' => $ongoingEvents,
            'Finished' => $finishedEvents,
        ]);
    }




    public function searchUsers(Request $request)
    {
        $query = $request->input('query');

        $users = User::where('name', 'LIKE', "%$query%")
            ->orWhere('id', 'LIKE', "%$query%")
            ->get();

        return response()->json($users);
    }

    public function searchBookings(Request $request)
    {
        $query = $request->input('query');

        $bookings = Booking::with('event')
        // ->where('esewa_status', true)
        ->where(function ($innerQuery) use ($query) {
            $innerQuery->
                where('eventId', 'LIKE', "%$query%")
                ->orWhere('id', 'LIKE', "%$query%");
        })
        ->get();


        $now = Carbon::now('Asia/Kathmandu');
        $finishedBookings=[];
        $ongoingBookings = [];
        $upcomingBookings = [];

        foreach ($bookings as $booking) {
            $startDateTime = Carbon::parse($booking->start_date, 'Asia/Kathmandu');
            $endDateTime = Carbon::parse($booking->end_date, 'Asia/Kathmandu');

            if ($endDateTime->lessThan($now)) {
                // Event is finished
                $finishedBookings[] = $booking;

            }elseif ($startDateTime->lessThan($now) && $endDateTime->greaterThan($now)) {
                // Event is ongoing
                $ongoingBookings[] = $booking;
            } elseif ($startDateTime->greaterThan($now)) {
                // Event is upcoming
                $upcomingBookings[] = $booking;
            }
        }

        return response()->json([
            'All' => $bookings,
            'Upcoming' => $upcomingBookings,
            'Ongoing' => $ongoingBookings,
            'Finished' => $finishedBookings,
        ]);
    }


    public function searchTrainers(Request $request)
    {
        $query = $request->input('query');

        $trainers = Trainer::where('id', 'LIKE', "%$query%")
            ->orWhere('name', 'LIKE', "%$query%")
            ->orWhere('post', 'LIKE', "%$query%")
            ->orWhere('skillLevel', 'LIKE', "%$query%")
            ->get();

        return response()->json($trainers);
    }
}
