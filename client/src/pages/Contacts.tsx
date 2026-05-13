import { useMemo } from "react";
import { communityContacts, type ContactCategory } from "../data/contacts";

const categories: ContactCategory[] = [
  "Builder",
  "Electrician",
  "Plumber",
  "Gardener",
  "Window cleaner",
  "Handyperson",
  "Other",
];

export function Contacts() {
  const grouped = useMemo(() => {
    const map = new Map<ContactCategory, typeof communityContacts>();
    for (const c of categories) map.set(c, []);
    for (const row of communityContacts) {
      const list = map.get(row.category) ?? [];
      list.push(row);
      map.set(row.category, list);
    }
    return map;
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl font-semibold text-titl-forest sm:text-4xl">
          Local trades &amp; services
        </h1>
        <p className="mt-3 max-w-readable text-lg leading-relaxed text-titl-bark">
          Neighbours often ask for builders, electricians, gardeners, window cleaners, and
          similar contacts in the main WhatsApp group. This page is ready for a curated list
          approved by your community admins. For now it shows sample rows so you can see the
          layout on phones and computers.
        </p>
      </header>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-lg text-titl-bark">
        <strong className="text-titl-forest">Safety:</strong> TiTL does not vet traders.
        Always ask for insurance, references, and a written quote before work starts.
      </div>

      <div className="space-y-10">
        {categories.map((cat) => {
          const rows = grouped.get(cat) ?? [];
          if (rows.length === 0) return null;
          return (
            <section key={cat} aria-labelledby={`cat-${cat}`}>
              <h2 id={`cat-${cat}`} className="border-b border-titl-sand pb-2 font-serif text-2xl font-semibold text-titl-forest">
                {cat}
              </h2>
              <ul className="mt-4 divide-y divide-titl-sand rounded-2xl border border-titl-sand bg-white shadow-sm">
                {rows.map((row) => (
                  <li key={row.id} className="px-4 py-5 sm:px-6">
                    <p className="text-xl font-semibold text-titl-forest">{row.businessOrName}</p>
                    <p className="mt-2 text-lg text-titl-bark">{row.notes}</p>
                    {row.phone ? (
                      <p className="mt-2">
                        <a href={`tel:${row.phone.replace(/\s/g, "")}`} className="text-lg font-semibold text-titl-moss underline">
                          {row.phone}
                        </a>
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
