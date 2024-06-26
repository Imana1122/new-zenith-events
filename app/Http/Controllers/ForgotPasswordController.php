<?php

namespace App\Http\Controllers;

use App\Models\PhoneNumberVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class ForgotPasswordController extends Controller
{
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phoneNumber' => 'required|exists:users,phoneNumber',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols(),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the user by the phoneNumber
        $user = User::where('phoneNumber', $request->phoneNumber)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Check if there is a valid verification record
        $verificationRecord = PhoneNumberVerification::where('phoneNumber', $request->phoneNumber)
            ->where('verificationStatus', true)
            ->where('expires_at', '>', now()->subMinutes(3))
            ->first();

        if (!$verificationRecord) {
            return response()->json(['error' => 'Invalid or expired verification code. Please resend the code.'], 422);
        }

        // Update the user's password
        $newPassword = Hash::make($request->password);
        $user->update([
            'password' => $newPassword
        ]);

        // Optional: Mark the verification record as used if needed
        $verificationRecord->update(['verificationStatus' => false]);

        return response()->json(['message' => 'Password reset successfully'], 200);
    }

}

