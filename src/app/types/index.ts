import { Reservation } from "./reservation";
import { Listing } from "./listing";
import { User } from "./user";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export interface SafeUser extends Partial<User> {
  emailVerified?: Date | null;
  updatedAt?: string;
  createdAt?: string;
}

