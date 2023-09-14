<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactDetailsRequest;
use App\Models\ContactDetails;
use Illuminate\Http\Request;

class ContactDetailsController extends Controller
{

    public function update(ContactDetailsRequest $request)
    {
        $contacts = ContactDetails::findOrFail(1);

        $data = $request->validated();



        // Update the Trainer model based on the fields present in the validated data
        $contacts->update([
            'phone' => $data['phone'],
            'email' => $data['email'],
            'location' => $data['location'],
            'facebook_link' => $data['facebook_link'],
            'instagram_link' => $data['instagram_link'],
            'twitter_link' => $data['twitter_link'],
            'github_link' => $data['github_link'],
            'youtube_link' => $data['youtube_link'],
            'tiktok_link' => $data['tiktok_link'],
            'allow_send_message' => $data['allow_send_message'],

        ]);

        return response()->json([
            'contacts' => $contacts,
            'message' => 'Contacts updated successfully.',
        ]);
    }

    public function getContactDetails()
    {
        $contact = ContactDetails::all();
        $contactupdate = ContactDetails::find(1);

        return response()->json(['contact' => $contact, 'contactupdate'=>$contactupdate]);
    }

}
