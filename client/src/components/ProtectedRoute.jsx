import React from "react";

export default function ProtectedRoute({ isAuthenticated, children }) {
    if (!isAuthenticated) {
        return (
            <div className="p-4 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded my-2">
                You must be logged in to access this section.
            </div>
        );
    }

    return <>{children}</>;
}
