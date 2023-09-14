<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class ProfileController extends Controller
{
    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {
        if (!Auth::check()) {
            return response(['error' => 'User not authenticated.'], 401);
        }

        // Ensure the user is authenticated before proceeding
        /** @var User $user */
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }

        $data = $request->validated();
        $roles = $user->getRoleNames();


        // Check if the user is a super admin
        if ($user->hasRole('Super Admin')) {
            // Super admin can update name and phone number
            $user->update([
                'name' => $data['name'],

            ]);
        } else {
            // Other users can only update their name
            $user->update([
                'name' => $data['name'],
                'phoneNumber' => $data['phoneNumber'],
            ]);
        }

        return response()->json([
            'user' => $user,
            'message' => 'Profile updated successfully.',
        ]);
    }


    public function updatePassword(Request $request){
        if (!Auth::check()) {
            return response(['error' => 'Hello not authorized.'], 401);
        }

        // Ensure the user is authenticated before proceeding
        /** @var User $user */
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }
        $validator = Validator::make($request->all(), [
            'currentPassword' => [
                'required',
                'string',
                function ($attribute, $value, $fail) use ($user) {
                    if (!\Hash::check($value, $user->password)) {
                        $fail('The current password is incorrect.');
                    }
                },
            ],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols(),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $password = $request->input('password');


        $user->update([
            'password' => $password,
        ]);

        return response()->json([
            'newPassword' => $password,
            'message' => 'Password updated successfully.',
        ]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request)
    {

        if (!Auth::check()) {
            return response(['error' => 'Login first'], 401);
        }

        // Ensure the user is authenticated before proceeding
        /** @var User $user */
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }

            $request->validate([
                'password' => ['required', 'string'],
            ]);



            $hashedPassword = Hash::make($request->input('password'));

            if (Hash::check($request->input('password'), $user->password)) {
                // Passwords match, proceed with deletion



    // Revoke and delete the user's access tokens (if using API token-based authentication)
    $user->tokens->each(fn ($token) => $token->delete());

    // Finally, delete the user from the database
    $user->delete();

    return response([
        'success' => true,
        'message' => 'User, related bookings, and event relationships deleted successfully.',
    ], 200);
            } else {
                return response()->json(['error' => 'The password is incorrect.'], 422);
            }

    }
}
