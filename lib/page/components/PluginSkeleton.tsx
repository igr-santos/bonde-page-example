import React from "react";

export default function PluginSkeleton() {
    return (
        <div className="animate-pulse rounded-xl border border-gray-200 bg-transparent p-4 shadow-sm space-y-4">
            <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        </div>
    );
}
