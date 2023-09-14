<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApplicationDetailsRequest extends FormRequest
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
            'logo' => [
                'required',
                function ($attribute, $value) {
                    // Check if it's an image with allowed extensions
                    if ($value instanceof \Illuminate\Http\UploadedFile) {
                        $allowedExtensions = ['jpeg', 'png', 'jpg', 'gif', 'svg'];
                        $extension = $value->getClientOriginalExtension();

                        if (in_array($extension, $allowedExtensions)) {
                            return;
                        }
                    }

                    // Check if it's a string containing one of the specified extensions
                    if (is_string($value) && preg_match('/\.(png|svg|gif|jpg|jpeg)$/i', $value)) {
                        return;
                    }


                },
                'max:2048', // Max file size (optional)
            ],
            'background_image' => [
                'required',
                function ($attribute, $value, $fail) {
                    // Check if it's an image with allowed extensions
                    if ($value instanceof \Illuminate\Http\UploadedFile) {
                        $allowedExtensions = ['jpeg', 'png', 'jpg', 'gif', 'svg'];
                        $extension = $value->getClientOriginalExtension();

                        if (in_array($extension, $allowedExtensions)) {
                            return;
                        }
                    }

                    // Check if it's a string containing ".png"
                    if (is_string($value) && strpos($value, '.png') !== false) {
                        return;
                    }

                    // Neither a valid image with allowed extensions nor a string containing ".png".
                    $fail("The $attribute must be either an image with extensions (jpeg, png, jpg, gif, svg) or a string containing '.png'.");
                },
                'max:2048', // Max file size (optional)
            ],
        ];

    }
}
