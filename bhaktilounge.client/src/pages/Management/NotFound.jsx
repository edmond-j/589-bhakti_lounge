import React from "react";
function NotFound() {
    return (
        <div className="flex-grow mx-auto px-4 flex items-center justify-start h-full md:px-8 bg-white rounded-r-2xl">
            <div className="max-w-lg mx-auto text-center mt-[-20rem]">
                <div className="pb-6">
                    <img
                        src="/logo.jpg"
                        width={150}
                        className="mx-auto"
                    />
                </div>
                <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">
                    Page not found
                </h3>
                <p className="text-gray-600 mt-3">
                    Sorry, the page you are looking for could not be found or
                    has been removed.
                </p>
            </div>
        </div>
    );
}

export default NotFound;
