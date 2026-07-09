import { z } from "zod";

export const SocialLinksSchema = z.object({
    phoneNumber: z.object({
        id: z.string(),
        value: z.string().nullable(),
    }),
    email: z.object({
        id: z.string(),
        value: z.string().nullable(),
    }),
});

export const CouponCodeSchema = z.object({
    id: z.string(),
    value: z.string().nullable(),
});

export const ReservationSchema = z.object({
    id: z.string(),
    name: z.string(),
    occasion: z.string().nullable(),
    additionalInformation: z.string().nullable(),
    couponCode: CouponCodeSchema,
    numberOfPeople: z.number().nullable(),
    status: z.number(),
    feedbackID: z.string(),
    reservationDate: z.string(),
    reservationTime: z.string(),
    "tableNo.": z.string(),
    socialLinks: z.array(SocialLinksSchema),
});

export type Reservation = z.infer<typeof ReservationSchema>;
export type SocialLinks = z.infer<typeof SocialLinksSchema>;
export type CouponCode = z.infer<typeof CouponCodeSchema>;

export interface ReservationApiResponse {
    success: boolean;
    message: string;
    data?: {
        item: Reservation;
    };
}

export type ReservationStatus =
    | "pending"
    | "confirmed"
    | "cancelled"
    | "request_expired"
    | "on_the_way";

export const STATUS_LABELS: Record<number, { label: string; variant: "blue" | "yellow" | "red" }> = {
    0: { label: "Pending", variant: "yellow" },
    1: { label: "Confirmed", variant: "blue" },
    2: { label: "Cancelled", variant: "red" },
    3: { label: "Request Expired", variant: "red" },
    4: { label: "On the Way", variant: "blue" },
};