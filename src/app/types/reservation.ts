export type Reservation = {
    id: string;
    userId: string;
    listingId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: string;
    createdAt: Date;
}