import { useMemo, useState } from "react";
import { communityContacts, type CommunityContact } from "../data/contacts";

type SortKey = "relevant" | "name" | "category" | "rating";

function sortContacts(list: CommunityContact[], sortKey: SortKey): CommunityContact[] {
  const copy = [...list];
  switch (sortKey) {
    case "name":
      return copy.sort((a, b) => a.businessOrName.localeCompare(b.businessOrName));
    case "category":
      return copy.sort((a, b) => {
        const c = a.category.localeCompare(b.category);
        return c !== 0 ? c : a.businessOrName.localeCompare(b.businessOrName);
      });
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ContactCard({
  row,
  phoneVisible,
  onShowPhone,
}: {
  row: CommunityContact;
  phoneVisible: boolean;
  onShowPhone: () => void;
}) {
  const tel = row.phone.replace(/\s/g, "");

  return (
    <article className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="min-w-0 flex flex-1 flex-col gap-4 sm:flex-row sm:gap-5">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-lg font-bold tracking-tight text-slate-700"
            aria-hidden
          >
            {row.initials}
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <h2 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
                {row.businessOrName}
              </h2>
              <span className="inline-flex w-fit rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
                {row.category}
              </span>
              <span className="inline-flex w-fit items-center rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-950">
                {row.rating.toFixed(2)} ({row.reviewCount} reviews)
              </span>
              {row.badge ? (
                <span className="inline-flex w-fit items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                  ★ {row.badge}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-1">
              <span className="inline-flex items-center gap-2">
                <IconMapPin className="shrink-0 text-slate-500" />
                <span>
                  Operates in <span className="font-medium text-slate-800">{row.area}</span>
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <IconClock className="shrink-0 text-slate-500" />
                <span className="font-medium text-slate-800">{row.availability}</span>
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">Services &amp; skills</h3>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-700">
                {row.services.map((s) => (
                  <li key={s} className="inline-flex items-center gap-1.5">
                    <span className="font-semibold text-sky-600" aria-hidden>
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {row.suggestedServices && row.suggestedServices.length > 0 ? (
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <h3 className="text-sm font-bold text-slate-900">Suggested services</h3>
                <ul className="mt-3 divide-y divide-slate-200/80 text-sm">
                  {row.suggestedServices.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-start justify-between gap-4 py-2 first:pt-0 last:pb-0"
                    >
                      <span className="inline-flex items-start gap-2 font-medium text-slate-800">
                        <span className="mt-0.5 font-semibold text-sky-600" aria-hidden>
                          ✓
                        </span>
                        {item.label}
                      </span>
                      <span className="shrink-0 font-semibold text-slate-700">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 lg:w-[200px]">
          {phoneVisible ? (
            <a
              href={`tel:${tel}`}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              <IconPhone className="shrink-0" />
              {row.phone}
            </a>
          ) : (
            <button
              type="button"
              onClick={onShowPhone}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              <IconPhone className="shrink-0" />
              Show phone number
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function Contacts() {
  const [sortKey, setSortKey] = useState<SortKey>("relevant");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const sorted = useMemo(() => sortContacts(communityContacts, sortKey), [sortKey]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="font-serif text-3xl font-semibold text-titl-forest sm:text-4xl">
          Local trades &amp; services
        </h1>
        <p className="max-w-readable text-lg leading-relaxed text-titl-bark">
          Find electricians, builders, gardeners, and other local contacts in one place. Always
          confirm insurance, references, and pricing before you agree to any work.
        </p>
      </header>

      <div className="rounded-xl bg-slate-900 px-4 py-3.5 text-sm text-white shadow-md sm:px-5 sm:text-base">
        <p className="leading-snug">
          <strong className="font-semibold text-white">TiTL does not vet listings.</strong>{" "}
          Ratings and reviews shown here are for layout only and are not checked by this site.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-800">
          <span>Sort by</span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="min-h-[44px] min-w-[12rem] rounded-lg border border-slate-300 bg-white px-3 py-2 text-base font-medium text-slate-900 shadow-sm"
          >
            <option value="relevant">Most relevant</option>
            <option value="rating">Highest rated</option>
            <option value="name">Name (A–Z)</option>
            <option value="category">Category</option>
          </select>
        </label>
        <p className="text-sm text-slate-600">
          {sorted.length} {sorted.length === 1 ? "listing" : "listings"}
        </p>
      </div>

      <ul className="space-y-4">
        {sorted.map((row) => (
          <li key={row.id}>
            <ContactCard
              row={row}
              phoneVisible={revealed[row.id] === true}
              onShowPhone={() => setRevealed((r) => ({ ...r, [row.id]: true }))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
