<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use App\Models\EventTrainer;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function createEvent(EventRequest $request)
{
    $data = $request->validated();

    // Check if an image was uploaded
    if ($request->hasFile('image')) {
        // Store the uploaded image in the 'public/images/trainers' directory
        $imagePath = $request->file('image')->store('public/images/events');


        $extension = 'png';
        $uniqueFilename = $data['title'] . '_' . time() . '.' . $extension;

        // Move the uploaded file with a custom filename
        Storage::move($imagePath, 'public/images/events/' . $uniqueFilename);


        $data['imagePath'] = $uniqueFilename;
    }

    // Use mass assignment to create the event
    $event = Event::create([
        'title' => $data['title'],
        'price' => $data['price'],
        'address' => $data['address'],
        'start_date' => $data['start_date'],
        'end_date' => $data['end_date'],
        'workshop' => $data['workshop'],
        'vat'=>$data['vat'],
        'imagePath' =>$data['imagePath'], // Save the image path
        'description' => $data['description'],
        'eventHostDetails' => $data['eventHostDetails']
    ]);

    $eventId = $event->id;
    $selectedTrainers = $data['selectedTrainers'];

    // Insert the data into the events_trainers table
    foreach ($selectedTrainers as $trainerId) {
        // Use Eloquent to insert data into the events_trainers table
        EventTrainer::create([
            'event_id' => $eventId,
            'trainer_id' => $trainerId,
        ]);
    }

    return response()->json(['message' => 'Event saved successfully']);
}


public function getAllEvents()
{
    $now = Carbon::now('Asia/Kathmandu');

    $events = Event::with('trainers')->get();

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
        'Finished' => $finishedEvents,
        'Ongoing' => $ongoingEvents,
        'Upcoming' => $upcomingEvents,
    ]);
}



    public function getEvents()
    {
        $today = Carbon::now('Asia/Kathmandu');

        $events = Event::with('trainers')->get();

        $allEvents = $events->filter(function ($event) use ($today) {
            return Carbon::parse($event->end_date, 'Asia/Kathmandu')->greaterThan($today);
        });

        return response()->json(['events' => $allEvents]);
    }


    public function getEventById($eventId)
    {
        try {
            $event = Event::with('trainers')->findOrFail($eventId);
            return response()->json(['event' => $event]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Event not found'], 404);
        }
    }

    public function updateEvent(EventRequest $request, $id)
{
    $event = Event::findOrFail($id);
    $data = $request->validated();



    // Check if a new image was uploaded
    if ($request->hasFile('image')) {
        // Delete the previous image if it exists
        $previousImagePath = $event->imagePath;

        if ($previousImagePath && Storage::exists('public/images/events/' .$previousImagePath)) {
            Storage::delete('public/images/events/' . $previousImagePath);
        }

        // Store the new uploaded image in the 'public/images/trainers' directory
        $imagePath = $request->file('image')->store('public/images/events');


        $extension = 'png';
        $uniqueFilename = $data['title'] . '_' . time() . '.' . $extension;

        // Move the uploaded file with a custom filename
        Storage::move($imagePath, 'public/images/events/' . $uniqueFilename);


        $data['imagePath'] = $uniqueFilename;
    }

    // Update the event with the new image path
    $event->update([
        'title' => $data['title'],
        'price' => $data['price'],
        'address' => $data['address'],
        'start_date' => $data['start_date'],
        'end_date' => $data['end_date'],
        'workshop' => $data['workshop'],
        'vat'=>$data['vat'],
        'imagePath' => $data['imagePath'], // Save the new image path
        'description' => $data['description'],
        'eventHostDetails' => $data['eventHostDetails'],
    ]);

    // Sync the selected trainers with the event
    $event->trainers()->sync($data['selectedTrainers']);

    return response()->json([
        'event' => $event,
        'message' => 'Event updated successfully.',
    ]);
}



public function deleteEvent($id)
{
    // Find and delete the event from the events table
    $event = Event::findOrFail($id);

    // Get the imagePath of the trainer
    $imagePath = $event->imagePath;

     // Check if the imagePath exists and delete the image file
     if ($imagePath && Storage::exists('public/images/events/' .$imagePath)) {
        Storage::delete('public/images/events/' . $imagePath);
    }

    $event->delete();

    // Delete records from the events_trainers table where event_id matches $id
    DB::table('events_trainers')->where('event_id', $id)->delete();

    return response()->json([
        'message' => 'Event and related trainers deleted successfully.',
    ]);
}




}
