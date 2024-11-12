<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller implements HasMiddleware
{


    public static function middleware(): array
    {
        return [
                new Middleware('role:super_admin'),
        ];
    }




    public function index()
    {
        $roles = Role::with('permissions')->get();

        return Inertia::render('ManageRoles', [
            'roles' => $roles,
            'permissions' => Permission::all()
        ]);
    }


    public function createRole(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:roles,name',
        ]);

        if ($validator->fails()) {

            return back()->with('success', $validator->errors()->first('name'));
        }

        Role::create(['name' => $request->name]);
        return back()->with('success', 'Role created successfully.');
    }


    public function editRole($id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        $permissions = Permission::all();

        return Inertia::render('EditRole', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }


    public function updateRole(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:roles,name,' . $id,
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $role = Role::findOrFail($id);
        $role->update([
            'name' => $request->name,
        ]);


        $role->permissions()->sync($request->permissions);

        return redirect()->route('permission.index')->with('success', 'Role updated successfully.');
    }


    public function destroyRole($id)
    {
        $role = Role::findOrFail($id);


        $role->delete();

        return back()->with('success', 'Role deleted successfully.');
    }
}
