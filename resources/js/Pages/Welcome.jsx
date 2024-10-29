import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <Head title="Welcome" />
            <div className='flex flex-col h-screen'>
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">News Scrapper</a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <Link
                                    href={route('dashboard')}
                                    as='a'
                                    className=""
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <details>
                                    <summary>Parent</summary>
                                    <ul className="bg-base-100 rounded-t-none p-2">
                                        <li>
                                            <Link
                                                href={route('dashboard')}
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('dashboard')}
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-4 p-6'>

                    <div className="card card-side bg-base-100 shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                                alt="Movie" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">New movie is released!</h2>
                            <p>Click the button to watch on Jetflix app.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Watch</button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-side bg-base-100 shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                                alt="Movie" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">New movie is released!</h2>
                            <p>Click the button to watch on Jetflix app.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Watch</button>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer footer-center bg-base-300 text-base-content p-4 mt-auto">
                    <aside>
                        <p>Copyright © {new Date().getFullYear()} - All right reserved by News Scrapper</p>
                    </aside>
                </footer>
            </div>

        </>
    );
}
