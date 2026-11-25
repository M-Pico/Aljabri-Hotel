<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    public function index()
    {
        return User::where('role', 'employee')
            ->select('id', 'name', 'email', 'created_at')
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $data['password'] = Hash::make($data['password']);
        $data['role'] = 'employee';

        $employee = User::create($data);

        return response()->json([
            'success' => true,
            'message' => 'تم إنشاء حساب الموظف',
            'employee' => $employee->only('id', 'name', 'email', 'role'),
        ], 201);
    }

    public function update(Request $request, User $employee)
    {
        abort_unless($employee->role === 'employee', 404);

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($employee->id),
            ],
            'password' => 'sometimes|required|string|min:8',
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $employee->update($data);

        return response()->json([
            'success' => true,
            'message' => 'تم تحديث بيانات الموظف',
            'employee' => $employee->only('id', 'name', 'email', 'role'),
        ]);
    }

    public function destroy(User $employee)
    {
        abort_unless($employee->role === 'employee', 404);

        $employee->tokens()->delete();
        $employee->delete();

        return response()->json([
            'success' => true,
            'message' => 'تم حذف حساب الموظف',
        ]);
    }
}
