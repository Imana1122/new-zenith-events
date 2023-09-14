<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainerRequest;
use App\Models\Trainer;
use Illuminate\Support\Facades\Storage;

class TrainerController extends Controller
{
    public function createTrainer(TrainerRequest $request)
    {
        $data = $request->validated();

        // Check if an image was uploaded
        if ($request->hasFile('image')) {
            // Store the uploaded image in the 'public/images/trainers' directory
            $imagePath = $request->file('image')->store('public/images/trainers');


            $extension = 'png';
            $uniqueFilename = $data['name'] . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($imagePath, 'public/images/trainers/' . $uniqueFilename);


            $data['imagePath'] = $uniqueFilename;
        }

        $trainer = Trainer::create([
            'name' => $data['name'],
            'post' => $data['post'],
            'skillLevel' => $data['skillLevel'],
            'experienceYears' => $data['experienceYears'],
            'imagePath' => $data['imagePath'],
        ]);

        return response()->json([
            'trainer' => $trainer,
        ]);
    }


    public function getAllTrainers()
    {
        $trainers = Trainer::all();

        return response()->json(['trainers' => $trainers]);
    }

    public function getTrainerById($trainerId)
    {
        try {
            $trainer = Trainer::findOrFail($trainerId);
            return response()->json(['trainer' => $trainer]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Trainer not found'], 404);
        }
    }

    public function updateTrainer(TrainerRequest $request, $id)
    {
        $trainer = Trainer::findOrFail($id);

        $data = $request->validated();

        // Check if a new image was uploaded
        if ($request->hasFile('image')) {
            // Delete the previous image if it exists
            $previousImagePath = $trainer->imagePath;

            if ($previousImagePath && Storage::exists('public/images/trainers/' .$previousImagePath)) {
                Storage::delete('public/images/trainers/' . $previousImagePath);
            }

            // Store the new uploaded image in the 'public/images/trainers' directory
            $imagePath = $request->file('image')->store('public/images/trainers');


            $extension = 'png';
            $uniqueFilename = $data['name'] . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($imagePath, 'public/images/trainers/' . $uniqueFilename);


            $data['imagePath'] = $uniqueFilename;
        }

        // Update the Trainer model based on the fields present in the validated data
        $trainer->update([
            'name' => $data['name'] ?? $trainer->name,
            'post' => $data['post'] ?? $trainer->post,
            'skillLevel' => $data['skillLevel'] ?? $trainer->skillLevel,
            'experienceYears' => $data['experienceYears'] ?? $trainer->experienceYears,
            'imagePath' => $data['imagePath'],
        ]);

        return response()->json([
            'trainer' => $trainer,
            'message' => 'Trainer updated successfully.',
        ]);
    }



    public function deleteTrainer($id)
    {
        $trainer = Trainer::findOrFail($id);

        // Check if the trainer is associated with any events
        $associatedEvents = $trainer->events()->count();

        if ($associatedEvents > 0) {
            return response()->json([
                'error' => 'Trainer cannot be deleted because they are associated with events.',
            ], 400); // You can use a different HTTP status code as appropriate
        }

        // Get the imagePath of the trainer
        $imagePath = $trainer->imagePath;

        // Check if the imagePath exists and delete the image file
        if ($imagePath && Storage::exists('public/images/trainers/' . $imagePath)) {
            Storage::delete('public/images/trainers/' . $imagePath);
        }

        // Delete the trainer record from the database
        $trainer->delete();

        return response()->json([
            'message' => 'Trainer deleted successfully.',
        ]);
    }

}
