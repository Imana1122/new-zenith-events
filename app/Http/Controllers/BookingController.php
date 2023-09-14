<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookingRequest;
use App\Models\Booking;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function store(BookingRequest $request) {
        $data = $request->validated();

        // Retrieve the event based on eventId
        $event = Event::find($data['eventId']);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $vat = $event->vat;

        // Calculate the total amount based on event price and noOfPeople
        $totalAmount = $event->price * $data['noOfPeople']+$event->price * $data['noOfPeople']* $vat/100 ;

        // Convert totalAmount to an integer (assuming it's in decimal format, you can adjust as needed)
        $totalAmount = (int) $totalAmount;
        $data['totalAmount'] = (int) $data['totalAmount'];

        if ($totalAmount === $data['totalAmount']) {
            Booking::create([
                'name' => $data['name'],
                'address'  => $data['address'],
                'eventId'  => $data['eventId'],
                'noOfPeople'  => $data['noOfPeople'],
                'totalAmount'  => $totalAmount, // Use the calculated totalAmount
                'phoneNumber'  => $data['phoneNumber'],
                'verificationStatus'  => true,
                'esewa_status'  => 'uncertain',
                'bookOrderId' => $data['bookOrderId']
            ]);

            // Optionally, you can return a success response or perform additional actions
            return response()->json(['message' => 'true']);
        } else {
            return response()->json(['error' => 'No further booking can be done.'], 400);
        }
    }




    public function getAllBookings()
    {
        $today = Carbon::now('Asia/Kathmandu');

        $bookings = Booking::with('event')
        ->where('esewa_status', true)
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
            'All' =>$bookings,
            'Upcoming' => $upcomingBookings,
            'Ongoing' => $ongoingBookings,
            'Finished' => $finishedBookings
        ]);
    }



    public function getRevenue()
    {
        $currentYear = date('Y');
        $monthlyRevenue = DB::table('bookings')

            ->selectRaw('MONTH(created_at) AS month, SUM(totalAmount) AS revenue')
            ->whereRaw("YEAR(created_at) = ?", [$currentYear])
            ->where('bookings.esewa_status', true)
            ->groupBy('month')
            ->orderBy('month')
            ->get();





        $totalYearlyRevenue = DB::table('bookings')
        ->selectRaw('YEAR(created_at) AS year, SUM(totalAmount) AS revenue')
            ->where('bookings.esewa_status', true)
            ->groupBy('year')
            ->get();

        return response()->json(['monthlyRevenue' => $monthlyRevenue, 'totalYearlyRevenue'=>$totalYearlyRevenue  ]);
    }






    public function deleteBooking($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();

        return response()->json([
            'message' => 'Booking deleted successfully.',
        ]);
    }

    public function getMostBookedEvents(Request $request)
    {
        $popularEvents = Event::leftJoin('bookings', function ($join) {
            $join->on('events.id', '=', 'bookings.eventId')
                 ->where('bookings.esewa_status', true);
        })
        ->select('events.*', DB::raw('COUNT(bookings.eventId) as bookings_count'))
        ->groupBy('events.id', 'events.title', 'events.workshop','events.vat', 'events.start_date', 'events.end_date', 'events.eventHostDetails', 'events.imagePath', 'events.description', 'events.price', 'events.address', 'events.created_at', 'events.updated_at')
        ->orderBy('bookings_count', 'DESC')
        ->get();


        $events = DB::table('bookings')
        ->select('eventId', DB::raw('COUNT(eventId) as booking_count'))->where('esewa_status',true)
        ->groupBy('eventId')
        ->orderBy('booking_count', 'DESC')
        ->get();

        return response()->json(['popularEvents'=> $popularEvents, 'orderedEvents'=>$events]);

    }

    public function userBooking(Request $request) {
        // Get the currently authenticated user
        $user = Auth::user();

        // Get the bookings for the user with esewa_status true
        $bookings = $user->bookings()
        ->where('esewa_status', true)
        ->with('event')
        ->get();

        // Get today's date
        $today = Carbon::now('Asia/Kathmandu');

        // Separate the bookings into different categories based on their dates
        $allBookings = [];
        $finishedBookings = [];
        $ongoingBookings = [];
        $yetToBeBookings = [];

        foreach ($bookings as $booking) {
            $startDate = Carbon::parse($booking->getAttribute('start_date'),'Asia/Kathmandu');
            $endDate = Carbon::parse($booking->getAttribute('end_date'),'Asia/Kathmandu');

            // Check if the booking is already finished
            if ($endDate->isBefore($today)) {
                $finishedBookings[] = $booking;
            } elseif ($startDate->isAfter($today)) {
                // Check if the booking is yet to be
                $yetToBeBookings[] = $booking;
            } else {
                // Otherwise, the booking is ongoing
                $ongoingBookings[] = $booking;
            }

            // Add the booking to the "all" bookings array
            $allBookings[] = $booking;
        }

        // Return the bookings in the response
        return response()->json([
            'All' => $allBookings,
            'Finished' => $finishedBookings,
            'Ongoing' => $ongoingBookings,
            'Upcoming' => $yetToBeBookings,
        ]);
    }




}
