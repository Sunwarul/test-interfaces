export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white flex flex-col">
            {/* Map placeholder */}
            <div className="flex-1 bg-[#e8e8e8]" />

            {/* Bottom sheet placeholder */}
            <div className="bg-white rounded-t-[32px] shadow-[-4px_0_24px_rgba(0,0,0,0.2)] p-6">
                <div className="h-20 bg-gray-200 rounded-lg animate-pulse mb-6" />
                <div className="space-y-4">
                    <div className="h-16 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-16 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="h-14 bg-gray-200 rounded-[32px] animate-pulse mt-6" />
            </div>
        </div>
    );
}