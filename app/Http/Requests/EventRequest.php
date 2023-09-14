<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'price' => 'required|string',
            'address' => 'required|string',
            'start_date' => 'required|date_format:Y-m-d\TH:i',
            'end_date' => 'required|date_format:Y-m-d\TH:i|after:start_date',
            'workshop' => 'required|string',
            'vat' => 'required|numeric|min:0|max:100',
            'description' => 'required|string',
            'eventHostDetails' => 'required|string',
            'imagePath' => 'nullable|string', // Allow only image files (jpeg, png, jpg, gif) with a maximum size of 2MB
            'selectedTrainers' => 'required|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];


    }

}
