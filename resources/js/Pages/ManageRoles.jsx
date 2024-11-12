import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router as Inertia } from '@inertiajs/react';
import { useState } from 'react';

export default function ManageRoles({ roles, permissions }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);


    const confirmDeleteRole = (id) => {
        setSelectedRoleId(id);
        setIsDeleteModalOpen(true);
    };

    const deleteRole = () => {
        Inertia.delete(`/manage-permissions/${selectedRoleId}`);
        setIsDeleteModalOpen(false);
        setSelectedRoleId(null);
    };

    const handleCreateRole = () => {
        if (roleName.trim()) {

            Inertia.post('/manage-permissions/create', { name: roleName });
            setRoleName('');
            setIsModalOpen(false);
        } else {
            alert("Role name can't be empty.");
        }
    };

    const editRole = (id) => {
        Inertia.get(`/manage-permissions/${id}/edit`);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Manage Roles
                </h2>
            }
        >
            <Head title="Manage Permissions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-semibold">Roles</h3>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {roles.map((role) => (
                                        <tr key={role.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {role.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => {
                                                        editRole(role.id)
                                                    }}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => confirmDeleteRole(role.id)}
                                                    className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Create New Role Button */}
                            <div className="mt-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Create New Role
                                </button>
                            </div>


                            {/* Modal for Creating New Role */}
                            {isModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                                    <div className="bg-gray-900	 rounded-lg shadow-lg p-6 w-full max-w-md">
                                        <h4 className="text-lg font-semibold mb-4">Create New Role</h4>
                                        <input
                                            type="text"
                                            value={roleName}
                                            onChange={(e) => setRoleName(e.target.value)}
                                            placeholder="Role Name"
                                            className="block w-full mb-4 border border-gray-300 rounded-md p-2 text-black"
                                        />
                                        <div className="flex justify-end">
                                            <button
                                                onClick={handleCreateRole}
                                                className="mr-2 px-4 py-2 bg-blue-600 text-white rounded"
                                            >
                                                Submit
                                            </button>
                                            <button
                                                onClick={() => setIsModalOpen(false)}
                                                className="px-4 py-2 bg-gray-300 text-black rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isDeleteModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
                                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                                        <h4 className="text-lg font-semibold mb-4 text-black">Confirm Deletion</h4>
                                        <p className="mb-4 text-gray-700">Are you sure you want to delete this role? This action cannot be undone.</p>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => setIsDeleteModalOpen(false)}
                                                className="px-4 py-2 bg-gray-300 text-black rounded mr-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={deleteRole}
                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
