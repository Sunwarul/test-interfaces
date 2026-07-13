export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-6 px-2 pr-6 pt-[59px] pb-4">
        <div className="w-[56px] h-[56px] rounded-[32px] bg-[rgba(0,0,0,0.05)]" />
        <div className="flex-1 h-8 bg-[rgba(0,0,0,0.05)] rounded-lg w-40" />
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col items-center px-6">
        <div className="mt-[195px] mb-10">
          <div className="w-[120px] h-[120px] rounded-[48px] bg-[rgba(0,0,0,0.05)]" />
        </div>

        <div className="w-full max-w-[366px] space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-[rgba(0,0,0,0.05)] rounded w-32 ml-4" />
            <div className="h-[48px] bg-[rgba(0,0,0,0.05)] rounded-[24px]" />
          </div>

          <div className="flex justify-center py-4">
            <div className="h-4 bg-[rgba(0,0,0,0.05)] rounded w-8" />
          </div>

          <div className="flex justify-center gap-6">
            <div className="w-[56px] h-[56px] rounded-[32px] bg-[rgba(0,0,0,0.05)]" />
            <div className="w-[56px] h-[56px] rounded-[32px] bg-[rgba(0,0,0,0.05)]" />
            <div className="w-[56px] h-[56px] rounded-[32px] bg-[rgba(0,0,0,0.05)]" />
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="px-6 pb-[62px] text-center">
        <div className="h-4 bg-[rgba(0,0,0,0.05)] rounded w-80 mx-auto" />
      </div>

      {/* Button Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 space-y-3">
        <div className="w-full h-[56px] rounded-[32px] bg-[rgba(0,0,0,0.05)]" />
        <div className="w-full h-[56px] rounded-[32px] bg-[rgba(0,0,0,0.05)]" />
      </div>
    </div>
  );
}