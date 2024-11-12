<?php

use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/manage-permissions', [PermissionController::class, ''])->middleware(['auth', 'verified'])->name('managepermissions');



Route::middleware('auth')->group(function () {
    Route::get('/manage-roles', [PermissionController::class, 'index'])->name('permission.index');
    Route::post('/manage-permissions/create', [PermissionController::class, 'createRole'])->name('permission.create');
    Route::get('/manage-permissions/{id}/edit', [PermissionController::class, 'editRole'])->name('permission.edit');
    Route::put('/manage-permissions/{id}', [PermissionController::class, 'updateRole'])->name('permission.update');
    Route::delete('/manage-permissions/{id}', [PermissionController::class, 'destroyRole'])->name('permission.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
