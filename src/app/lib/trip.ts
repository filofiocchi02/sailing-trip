export type TripDetails = {
  name: string;
  country: string;
  description: string;
  arrivalInfo: string;
  howToGetThere: string;
  arrivalDeadline: string;
  recommendedAirport: string;
  airportTransfer: string;
  departureDateTime: string;
  boatDeparture: string;
  boatTiming: string;
  provisionalLocation: string;
  finalLocation: string;
  locationCoordinates: string;
  provisionalWeeks: string[];
  finalWeek: string;
  boatCount: number;
  capacityPerBoat: number;
  estimatedCost: number;
  depositCost: number;
  waitlistCount: number;
  acceptedCount: number;
  paidDepositCount: number;
};

export const tripDetailsSchema = [
  { key: "description", label: "Trip description", type: "textarea" },
  { key: "arrivalInfo", label: "Arrival and travel information", type: "textarea" },
] as const;

export const tripLogisticsSchema = [
  { key: "provisionalLocation", label: "Provisional location", type: "text" },
  { key: "finalLocation", label: "Final location", type: "text" },
  { key: "locationCoordinates", label: "Google Maps coordinates", type: "text" },
  { key: "finalWeek", label: "Final dates", type: "text" },
  { key: "boatCount", label: "Available boats", type: "number" },
  { key: "capacityPerBoat", label: "Places per boat", type: "number" },
  { key: "estimatedCost", label: "Trip cost", type: "number" },
] as const;

export const defaultTripDetails: TripDetails = {
  name: "Youth Sailing Croatia 2027",
  country: "Croatia",
  description: "A shared sailing week in southern Dalmatia, with gentle winds, line-of-sight navigation, island hops, sheltered coves, and the chance to explore Croatia from the water.",
  arrivalInfo: "Fly into Dubrovnik Airport (DBV). Please aim to reach the marina by 14:00 on the first day; we will coordinate the transfer from the airport once everyone’s flights are known. The sailing area is known for gentle winds and line-of-sight navigation, with possible island stops around Lokrum, Mljet, and Korčula.",
  howToGetThere: "Fly to the recommended airport, then travel to the marina.",
  arrivalDeadline: "Arrive at the marina by 14:00 on the first day.",
  recommendedAirport: "Split Airport (SPU)",
  airportTransfer: "We will coordinate a shared transfer from Split Airport to the marina once flights are known.",
  departureDateTime: "",
  boatDeparture: "Be at the boat by 17:00 on the Saturday of the start week.",
  boatTiming: "",
  provisionalLocation: "Dubrovnik, southern Dalmatia",
  finalLocation: "Dubrovnik, Croatia — marina to be confirmed",
  locationCoordinates: "",
  provisionalWeeks: [
    "1–7 June 2027", "8–14 June 2027", "15–21 June 2027", "22–28 June 2027", "29 June–5 July 2027",
    "6–12 July 2027", "13–19 July 2027", "20–26 July 2027", "27 July–2 August 2027", "3–9 August 2027",
    "10–16 August 2027", "17–23 August 2027", "24–30 August 2027", "31 August–6 September 2027", "7–13 September 2027",
    "14–20 September 2027", "21–27 September 2027", "28 September–4 October 2027",
  ],
  finalWeek: "Not finalised",
  boatCount: 4,
  capacityPerBoat: 6,
  estimatedCost: 500,
  depositCost: 250,
  waitlistCount: 19,
  acceptedCount: 10,
  paidDepositCount: 2,
};

export const tripStorageKey = "youth-sailing-trip-details";

export function totalTripSlots(trip: TripDetails) {
  return trip.boatCount * trip.capacityPerBoat;
}

export function availableTripSlots(trip: TripDetails) {
  return Math.max(0, totalTripSlots(trip) - trip.paidDepositCount);
}
