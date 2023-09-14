<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Routes that require CSRF protection
Route::middleware(['auth:sanctum'])->group(function () {

    // AuthController routes
    Route::post('/logout', [AuthController::class, 'logout']);

    // ProfileController routes
    Route::put('/updatePassword', 'App\Http\Controllers\ProfileController@updatePassword');
    Route::put('/updateProfile', 'App\Http\Controllers\ProfileController@update');

    // BookingController routes
    Route::get('/bookings', 'App\Http\Controllers\BookingController@getAllBookings');
    Route::delete('/deleteBooking/{id}', 'App\Http\Controllers\BookingController@deleteBooking');
    Route::get('/getMostBookedEvents', 'App\Http\Controllers\BookingController@getMostBookedEvents');


    // TrainerController routes
    Route::post('/createTrainer', 'App\Http\Controllers\TrainerController@createTrainer');
    Route::post('/updateTrainer/{trainerId}', 'App\Http\Controllers\TrainerController@updateTrainer');
    Route::delete('/deleteTrainer/{id}', 'App\Http\Controllers\TrainerController@deleteTrainer');
    Route::get('/allTrainers', 'App\Http\Controllers\TrainerController@getAllTrainers');
    Route::get('/trainers/{trainerId}', 'App\Http\Controllers\TrainerController@getTrainerById');

    // EventController routes

    Route::get('/allEvents', 'App\Http\Controllers\EventController@getAllEvents');
    Route::get('/events/{eventId}', 'App\Http\Controllers\EventController@getEventById');

    Route::delete('/deleteEvent/{id}', 'App\Http\Controllers\EventController@deleteEvent');


    // SearchController routes
    Route::get('/search/events', 'App\Http\Controllers\SearchController@searchEvents');
    Route::get('/search/users', 'App\Http\Controllers\SearchController@searchUsers');
    Route::get('/search/bookings', 'App\Http\Controllers\SearchController@searchBookings');
    Route::get('/search/trainers', 'App\Http\Controllers\SearchController@searchTrainers');

    //ContactDetailsController routes
    Route::put('/update-contact-details', 'App\Http\Controllers\ContactDetailsController@update');
    Route::get('/get-contact-details', 'App\Http\Controllers\ContactDetailsController@getContactDetails');

    //ApplicationDetailsController routes
    Route::post('/update-application-details', 'App\Http\Controllers\ApplicationDetailsController@update');
    Route::get('/get-application-details', 'App\Http\Controllers\ApplicationDetailsController@getApplicationDetails');

    //UserController
    Route::get('/getUsers', 'App\Http\Controllers\UserController@getUsers');

    //DashboardController
    Route::get('/getRevenue', 'App\Http\Controllers\DashboardController@getRevenue');
    Route::get('/getDashboardDetails', 'App\Http\Controllers\DashboardController@getDashboardDetails');
});

Route::middleware(['auth:sanctum', 'role:Super Admin'])->group(function () {
    //UserController
    Route::delete('/deleteUser/{id}', 'App\Http\Controllers\UserController@removeUser');

    // AuthController routes
    Route::post('/signupDataVerification', 'App\Http\Controllers\AuthController@signupDataVerification');
    Route::post('/signupPhoneNumberVerification', 'App\Http\Controllers\AuthController@signupPhoneNumberVerification');
    Route::post('/signup', 'App\Http\Controllers\AuthController@signup');
});

// Routes that require the "Admin" role
Route::middleware(['auth:sanctum', 'role:Admin'])->group(function () {
    Route::delete('/deleteUser', 'App\Http\Controllers\ProfileController@destroy');

});
Route::post('/createEvent', 'App\Http\Controllers\EventController@createEvent');

Route::post('/updateEvent/{id}', 'App\Http\Controllers\EventController@updateEvent');

// AuthController routes
Route::post('/loginDataVerification', 'App\Http\Controllers\AuthController@loginDataVerification');
Route::post('/login', 'App\Http\Controllers\AuthController@login');

// ForgotPasswordController route
Route::put('/resetPassword', 'App\Http\Controllers\ForgotPasswordController@resetPassword');

// PhoneVerificationController routes
Route::post('/verify-phone', 'App\Http\Controllers\PhoneVerificationController@sendVerificationCode');
Route::post('/verify-code', 'App\Http\Controllers\PhoneVerificationController@verifyPhoneNumber');
Route::post('/send-code', 'App\Http\Controllers\PhoneVerificationController@sendCode');

// EventController routes
Route::get('/events', 'App\Http\Controllers\EventController@getEvents');

//BookingController
Route::post('/createBooking', 'App\Http\Controllers\BookingController@store');

//EsewaController
Route::post('/esewa-payment', 'App\Http\Controllers\EsewaController@esewaPayment');

//ContactDetailsController routes
Route::get('/get-contact-details', 'App\Http\Controllers\ContactDetailsController@getContactDetails');

//ApplicationDetailsController routes
Route::get('/get-application-details', 'App\Http\Controllers\ApplicationDetailsController@getApplicationDetails');



