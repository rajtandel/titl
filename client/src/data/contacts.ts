export type ContactCategory =
  | "Builder"
  | "Electrician"
  | "Plumber"
  | "Gardener"
  | "Window cleaner"
  | "Handyperson"
  | "Other";

export type SuggestedService = {
  label: string;
  price: string;
};

export type CommunityContact = {
  id: string;
  category: ContactCategory;
  businessOrName: string;
  /** Score out of 10 (display only; not independently verified). */
  rating: number;
  reviewCount: number;
  area: string;
  availability: string;
  services: string[];
  suggestedServices?: SuggestedService[];
  phone: string;
  /** Two letters for the avatar tile when no logo URL. */
  initials: string;
  /** Optional ribbon (e.g. highlighted listing). */
  badge?: string;
};

export const communityContacts: CommunityContact[] = [
  {
    id: "1",
    category: "Electrician",
    businessOrName: "Sol-lux Electrical",
    rating: 9.4,
    reviewCount: 84,
    area: "Thurmaston, Leicester & nearby",
    availability: "Usually within 48 hours",
    services: [
      "Domestic electrics",
      "Consumer unit upgrades",
      "Fault finding",
      "Outdoor lighting",
    ],
    suggestedServices: [
      { label: "Electrical fault finding", price: "from £60" },
      { label: "EV charger survey", price: "from £45" },
    ],
    phone: "0116 555 0101",
    initials: "SE",
    badge: "Often recommended locally",
  },
  {
    id: "2",
    category: "Builder",
    businessOrName: "Oakridge Extensions",
    rating: 9.1,
    reviewCount: 32,
    area: "Leicestershire",
    availability: "Bookings 2–4 weeks ahead",
    services: ["Extensions", "Structural alterations", "Kitchen rip-outs", "Plastering team"],
    phone: "0116 555 0102",
    initials: "OE",
  },
  {
    id: "3",
    category: "Gardener",
    businessOrName: "Green Hedge Garden Care",
    rating: 9.6,
    reviewCount: 56,
    area: "Thurmaston & Syston",
    availability: "Fortnightly rounds",
    services: ["Lawn care", "Hedge cutting", "Border tidy", "Green waste removal"],
    phone: "0116 555 0103",
    initials: "GH",
  },
  {
    id: "4",
    category: "Window cleaner",
    businessOrName: "Crystal Clear Domestic",
    rating: 8.9,
    reviewCount: 120,
    area: "Thurmaston new builds",
    availability: "Monthly rota — ask for your street",
    services: ["Residential windows", "Conservatories", "Gutter clear"],
    phone: "0116 555 0104",
    initials: "CC",
  },
  {
    id: "5",
    category: "Handyperson",
    businessOrName: "Odd Jobs Leicester",
    rating: 9.2,
    reviewCount: 41,
    area: "LE3, LE4, LE7",
    availability: "Evenings & Saturdays",
    services: ["Flat-pack assembly", "Shelving", "Small repairs", "Curtain poles"],
    phone: "0116 555 0105",
    initials: "OJ",
  },
  {
    id: "6",
    category: "Plumber",
    businessOrName: "FlowRight Heating & Plumbing",
    rating: 9.3,
    reviewCount: 67,
    area: "Leicester & Charnwood",
    availability: "Emergency call-out where offered",
    services: ["Boiler service", "Bathroom refit", "Leaks", "Radiators"],
    suggestedServices: [{ label: "Boiler service", price: "from £85" }],
    phone: "0116 555 0106",
    initials: "FR",
  },
];
