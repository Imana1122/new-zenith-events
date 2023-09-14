<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //


    public function getDashboardDetails(Request $request)
{
    // Get all users
    $users = User::all()->count();

    // Get the current month and year
    $currentMonth = Carbon::now('Asia/Kathmandu')->format('m');
    $currentYear = Carbon::now('Asia/Kathmandu')->format('Y');

    // Get users created within the current month and year
    $thisMonthUsers = User::whereMonth('created_at', '=', $currentMonth)
        ->whereYear('created_at', '=', $currentYear)
        ->count();

    $totalMonthlyRevenue = DB::table('bookings')
        ->selectRaw('SUM(totalAmount) AS revenue')
        ->where('bookings.esewa_status', true)
        ->whereYear('created_at', $currentYear)
        ->whereMonth('created_at', $currentMonth)
        ->get();

    $totalYearlyRevenue = DB::table('bookings')
        ->selectRaw('SUM(totalAmount) AS revenue')
        ->where('bookings.esewa_status', true)
        ->whereYear('created_at', $currentYear)
        ->get();

    // Use the query builder for bookings and events
    $bookings = Booking::where('esewa_status', true)
        ->whereMonth('created_at', '=', $currentMonth)
        ->count();

    $thisMonthBookings = Booking::with('event')
        ->where('esewa_status', true)
        ->whereMonth('created_at', '=', $currentMonth)
        ->count();

    $events = Event::all()->count();

    // Use the query builder for thisMonthEvents
    $thisMonthEvents = Event::whereMonth('created_at', '=', $currentMonth)
        ->count();

    return response()->json([
        'users' => $users,
        'thisMonthUsers' => $thisMonthUsers,
        'totalMonthlyRevenue' => $totalMonthlyRevenue,
        'totalYearlyRevenue' => $totalYearlyRevenue,
        'bookings' => $bookings,
        'thisMonthBookings' => $thisMonthBookings,
        'events' => $events,
        'thisMonthEvents' => $thisMonthEvents
    ]);
}


    public function getRevenue(Request $request){
        $currentMonth = Carbon::now('Asia/Kathmandu')->format('m');
        $currentYear = Carbon::now('Asia/Kathmandu')->format('Y');

        $monthlyRevenue = DB::table('bookings')
            ->selectRaw('YEAR(created_at) AS year, MONTH(created_at) AS month, SUM(totalAmount) AS revenue')
            ->where('bookings.esewa_status', true)
            ->whereYear('created_at', $currentYear)
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        $yearlyRevenue = DB::table('bookings')
            ->selectRaw('YEAR(created_at) AS year, SUM(totalAmount) AS revenue')
            ->where('bookings.esewa_status', true)
            ->groupBy('year')
            ->get();

        return response()->json([
            'monthlyRevenue' => $monthlyRevenue,
            'yearlyRevenue'=>$yearlyRevenue,
        ]);
    }


}
