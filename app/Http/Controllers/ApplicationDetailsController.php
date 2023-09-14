<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicationDetailsRequest;
use App\Models\ApplicationDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ApplicationDetailsController extends Controller
{
    public function update(ApplicationDetailsRequest $request)
    {
        $application_details = ApplicationDetails::findOrFail(1);

        $data= $request->validated();

        // Check if a new image was uploaded
        if ($request->hasFile('logo')) {
            // Delete the previous image if it exists
            $previouslogo = $application_details->logo;

            if ($previouslogo && Storage::exists('public/images/application/' .$previouslogo)) {
                Storage::delete('public/images/application/' . $previouslogo);
            }

            // Store the new uploaded image in the 'public/images/trainers' directory
            $logoPath = $request->file('logo')->store('public/images/application');


            $extension = $data['logo']->getClientOriginalExtension();
            $uniqueFilename = 'logo' . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($logoPath, 'public/images/application/' . $uniqueFilename);


            $data['logo'] = $uniqueFilename;
        }

        if ($request->hasFile('background_image')) {
            // Delete the previous image if it exists

            $previous_backgound_image = $application_details->background_image;

            if ($previous_backgound_image && Storage::exists('public/images/application/' .$previous_backgound_image)) {
                Storage::delete('public/images/application/' . $previous_backgound_image);
            }

            // Store the new uploaded image in the 'public/images/trainers' directory
            $image_path = $request->file('background_image')->store('public/images/application');


            $extension = 'png';
            $uniqueFilename = 'background_image' . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($image_path, 'public/images/application/' . $uniqueFilename);


            $data['background_image'] = $uniqueFilename;
        }

        // Update the Trainer model based on the fields present in the validated data
        $application_details->update([
            'logo' => $data['logo'],
            'backgound_image' => $data['background_image'],
        ]);

        return response()->json([
            'application_details' => $application_details,
            'message' => 'Application Images updated successfully.',
        ]);
    }

    public function getApplicationDetails()
    {
        $application_details = ApplicationDetails::all();
        $application_detail = ApplicationDetails::find(1);

        return response()->json(['application_details' => $application_details, 'application_detail'=>$application_detail]);
    }
}
