export default function Navbar() {
    return (
        <div className="navbar bg-primary h-45">
            <div className="hidden sm:block flex-1">
                <img src="public/big_logo.png" className="h-36" />
            </div>
            <div className="rounded-md w-1/3 mx-auto">
                <div className="w-full flex input input-bordered items-center justify-between w-auto rounded-3xl">
                    <input type="text" placeholder="Search..." className="w-full pl-2"/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </div>
            </div>
            <div className="flex-1 justify-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-6">
                    <img src="public/support.svg" />
                </div>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-6">
                    <img src="public/profile.svg" />
                </div>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-6">
                    <img src="public/basket.svg" className="scale-125"/>
                </div>
            </div>
        </div>
    )
}