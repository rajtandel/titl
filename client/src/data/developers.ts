export type Developer = {
  id: string;
  name: string;
  shortName: string;
  role: string;
  summary: string;
  address?: string;
  phone?: string;
  hours?: string;
  href: string;
  accent: "forest" | "moss" | "sage";
};

export const developers: Developer[] = [
  {
    id: "dwh",
    name: "David Wilson Homes",
    shortName: "DWH",
    role: "Part of Barratt Developments — new homes at Thorpebury",
    summary:
      "David Wilson Homes builds quality family homes across the UK. Search their new homes site for Thorpebury to see current availability, show home opening times, and buyer offers for this development.",
    href: "https://www.dwh.co.uk/new-homes/?qloc=Thorpebury",
    accent: "forest",
  },
  {
    id: "davidsons",
    name: "Davidsons Homes",
    shortName: "Davidsons",
    role: "Georgian & Victorian style homes at Thorpebury in the Limes",
    summary:
      "A range of 2, 3, 4 & 5 bedroom Georgian and Victorian style homes in the new village of Thorpebury, close to Thurmaston and Leicester. Davidsons describe the location as ideal for families, with schools nearby and Watermead Country Park within reach.",
    address: "Limetree Way, Thurmaston, Leicestershire LE7 3AX",
    phone: "0116 490 8923",
    hours:
      "Seven days a week — browsing hours typically 10:00–17:00 (check before visiting).",
    href: "https://davidsonsgroup.co.uk/developments/thorpeburyinthelimes/",
    accent: "moss",
  },
  {
    id: "william-davis",
    name: "William Davis Homes",
    shortName: "William Davis",
    role: "2, 3 & 4 bedroom homes — Thorpebury in the Limes",
    summary:
      "William Davis Homes offers a mix of house types at Thorpebury in the Limes on Barkby Thorpe Road. The development is described as village living with Leicester city centre around a twenty-minute drive, with local shops, schools, and amenities nearby.",
    address: "Barkby Thorpe Road, Thurmaston, LE7 3QP",
    hours: "Sales office open 11:00–17:00, seven days a week.",
    href: "https://www.williamdavis.co.uk/development/thorpebury-in-the-limes/",
    accent: "sage",
  },
];
