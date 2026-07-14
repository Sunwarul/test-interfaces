"use client";

import { Play } from "lucide-react";

interface VideoThumbnailProps {
    thumbnailUrl?: string;
    onPlayClick?: () => void;
}

export function VideoThumbnail({
    thumbnailUrl,
    onPlayClick,
}: VideoThumbnailProps) {
    return (
        <button
            type="button"
            onClick={onPlayClick}
            className="bg-black/20 relative cursor-pointer flex items-center justify-center rounded-3xl w-full h-[187px] overflow-hidden"
        >
            {/* Thumbnail image or placeholder */}
            {thumbnailUrl ? (
                <img
                    src={thumbnailUrl}
                    alt="Video thumbnail"
                    className="absolute inset-0 size-full object-cover rounded-3xl"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600" />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 rounded-3xl" />

            {/* Play button and text */}
            <div className="relative flex items-center gap-3">
                <div className="size-8 flex items-center justify-center">
                    <Play className="size-8 text-white fill-white" />
                </div>
                <span className="text-[16px] font-medium leading-6 text-white tracking-[-0.16px] whitespace-nowrap">
                    Watch how it works
                </span>
            </div>
        </button>
    );
}