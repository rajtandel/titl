export type ContactCategory =
  | "Builder"
  | "Electrician"
  | "Plumber"
  | "Gardener"
  | "Window cleaner"
  | "Handyperson"
  | "Other";

export type CommunityContact = {
  id: string;
  category: ContactCategory;
  businessOrName: string;
  notes: string;
  /** Placeholder — real numbers should be shared via your WhatsApp admins */
  phone?: string;
};

/** Sample rows for layout only; replace with curated list from your community group. */
export const communityContacts: CommunityContact[] = [
  {
    id: "1",
    category: "Electrician",
    businessOrName: "Example Electrical Services",
    notes: "Replace this row with a trusted contact from your main WhatsApp group.",
  },
  {
    id: "2",
    category: "Builder",
    businessOrName: "Example Building Co.",
    notes: "Always ask for references and insurance before work begins.",
  },
  {
    id: "3",
    category: "Gardener",
    businessOrName: "Example Garden Care",
    notes: "Seasonal tidy-ups and regular maintenance.",
  },
  {
    id: "4",
    category: "Window cleaner",
    businessOrName: "Example Windows",
    notes: "Monthly rounds — confirm coverage for your street.",
  },
  {
    id: "5",
    category: "Handyperson",
    businessOrName: "Example Odd Jobs",
    notes: "Small repairs and flat-pack assembly.",
  },
];
