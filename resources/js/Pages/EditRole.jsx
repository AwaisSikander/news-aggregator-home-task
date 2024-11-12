import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router as Inertia } from '@inertiajs/react';
import { useState } from 'react';

export default function EditRole({ role, permissions }) {
    const [roleName, setRoleName] = useState(role.name); // Initialize state for role name
    const [selectedPermissions, setSelectedPermissions] = useState(
        role.permissions.map(permission => permission.id) // Set selected permissions based on role's existing permissions
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send updated role data to the server
        Inertia.put(`/manage-permissions/${role.id}`, {
            name: roleName,
            permissions: selectedPermissions,
        });
    };

    const handlePermissionChange = (id) => {
        setSelectedPermissions((prev) => {
            if (prev.includes(id)) {
                return prev.filter(permissionId => permissionId !== id); // Remove permission if already selected
            } else {
                return [...prev, id]; // Add permission if not selected
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Role
                </h2>
            }
        >
            <Head title="Edit Role" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor="roleName">
                                        Role Name
                                    </label>
                                    <input
                                        type="text"
                                        id="roleName"
                                        value={roleName}
                                        onChange={(e) => setRoleName(e.target.value)}
                                        className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">Permissions</label>
                                    <div className="mt-2">
                                        {permissions.map((permission) => (
                                            <div key={permission.id} className="flex items-center mb-2">
                                                <input
                                                    type="checkbox"
                                                    id={`permission-${permission.id}`}
                                                    checked={selectedPermissions.includes(permission.id)}
                                                    onChange={() => handlePermissionChange(permission.id)}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <label htmlFor={`permission-${permission.id}`} className="ml-2 text-sm text-gray-900 dark:text-gray-100">
                                                    {permission.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
