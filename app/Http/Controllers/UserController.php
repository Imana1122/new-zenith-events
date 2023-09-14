<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //

    public function getUsers(Request $request)
    {
        // Get all users
        $users = User::all();

        return response()->json(['users' => $users]);
    }





public function removeUser(Request $request, $id)
{
    try {
        // Find the user by ID
        $user = User::findOrFail($id);

        // Check if the user's phone number is the one you want to prevent deletion
        if ($user->phoneNumber === '9815335034') {
            return response()->json(['error' => 'This user cannot be deleted. It is super admin'], 400);
        }

        // Perform the delete operation
        $user->delete();

        // Return a success response or redirect
        return response()->json(['success' => 'User deleted successfully.']);
    } catch (\Exception $e) {
        // Handle any exceptions that may occur during the deletion process
        return response()->json(['error' => 'Failed to delete user.'], 500);
    }
}



}
