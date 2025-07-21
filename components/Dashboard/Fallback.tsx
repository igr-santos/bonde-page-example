export default function Fallback() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex items-center justify-center gap-2">
                <svg className="w-2 h-2 fill-current text-gray-600 animate-bounce" style={{ animationDelay: "0s" }} viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="4" />
                </svg>
                <svg className="w-2 h-2 fill-current text-gray-600 animate-bounce" style={{ animationDelay: "0.2s" }} viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="4" />
                </svg>
                <svg className="w-2 h-2 fill-current text-gray-600 animate-bounce" style={{ animationDelay: "0.4s" }} viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="4" />
                </svg>
            </div>
        </div>
    )
}