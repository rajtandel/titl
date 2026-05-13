export type CommunityEvent = {
  id: string;
  title: string;
  dateLabel: string;
  isoDate: string;
  location: string;
  description: string;
  /** past | upcoming for simple filtering */
  status: "upcoming" | "past";
};

export const communityEvents: CommunityEvent[] = [
  {
    id: "e1",
    title: "Summer community afternoon",
    dateLabel: "Saturday 21 June 2026, 14:00–16:00",
    isoDate: "2026-06-21",
    location: "Village green / community space (TBC)",
    description:
      "A placeholder event for layout. When you have real dates, update this page or connect a calendar later.",
    status: "upcoming",
  },
  {
    id: "e2",
    title: "Residents’ association meeting",
    dateLabel: "Wednesday 9 July 2026, 19:30",
    isoDate: "2026-07-09",
    location: "Online or local venue (TBC)",
    description: "Example entry — replace with your RA or parish council details.",
    status: "upcoming",
  },
  {
    id: "e3",
    title: "William Davis — Part Exchange & Assisted Move weekend",
    dateLabel: "Saturday 9 & Sunday 10 May 2026",
    isoDate: "2026-05-09",
    location: "Thorpebury in the Limes, Barkby Thorpe Road, Thurmaston LE7 3QP",
    description:
      "Sales weekend advertised on the William Davis Homes website for this development. Check their site for future open days and offers.",
    status: "past",
  },
];
