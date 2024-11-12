<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{

    protected $permissions = [
        'create posts',
        'edit posts',
        'delete posts',
        'view posts',
        'create users',
        'edit users',
        'delete users',
        'view users',
        'manage roles',
        'manage permissions',
    ];

    protected $roles = [
        'super_admin',
        'admin',
        'user'
    ];
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Awais Sikander',
            'email' => 'sikande007@gmail.com',
             'password' => Hash::make('password'),
        ]);

        foreach ($this->permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        foreach ($this->roles as $role) {
            Role::create(['name' => $role]);
        }

        $role = Role::findByName('super_admin');
        $permissions = Permission::pluck('id', 'id')->all();
        $role->syncPermissions($permissions);

        $user->assignRole('super_admin');
    }
}
