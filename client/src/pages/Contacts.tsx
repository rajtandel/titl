import { useMemo, useState } from "react";
import { AnimateIn } from "../components/AnimateIn";
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
    <article className="card card-interactive p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:gap-5">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-titl-accent/10 font-display text-base font-semibold tracking-tight text-titl-accent"
            aria-hidden
          >
            {row.initials}
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <h2 className="text-xl font-semibold leading-tight text-titl-text sm:text-2xl">
                {row.businessOrName}
              </h2>
              <span className="inline-flex w-fit rounded-full border border-titl-border bg-titl-bg px-2.5 py-0.5 text-xs font-medium text-titl-muted">
                {row.category}
              </span>
              <span className="inline-flex w-fit items-center rounded-full bg-titl-divider px-3 py-1 text-sm font-medium text-titl-text">
                {row.rating.toFixed(2)} ({row.reviewCount} reviews)
              </span>
              {row.badge ? (
                <span className="inline-flex w-fit items-center gap-1 rounded-full border border-titl-border px-2.5 py-1 text-xs text-titl-muted">
                  ★ {row.badge}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 text-sm text-titl-muted sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-1">
              <span className="inline-flex items-center gap-2">
                <IconMapPin className="shrink-0 text-titl-subtle" />
                <span>
                  Operates in <span className="font-medium text-titl-text">{row.area}</span>
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <IconClock className="shrink-0 text-titl-subtle" />
                <span className="font-medium text-titl-text">{row.availability}</span>
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-titl-text">Services &amp; skills</h3>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-titl-muted">
                {row.services.map((s) => (
                  <li key={s} className="inline-flex items-center gap-1.5">
                    <span className="text-titl-accent" aria-hidden>
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {row.suggestedServices && row.suggestedServices.length > 0 ? (
              <div className="rounded-xl bg-titl-bg p-4">
                <h3 className="text-sm font-semibold text-titl-text">Suggested services</h3>
                <ul className="mt-3 divide-y divide-titl-border text-sm">
                  {row.suggestedServices.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-start justify-between gap-4 py-2 first:pt-0 last:pb-0"
                    >
                      <span className="inline-flex items-start gap-2 font-medium text-titl-text">
                        <span className="mt-0.5 text-titl-accent" aria-hidden>
                          ✓
                        </span>
                        {item.label}
                      </span>
                      <span className="shrink-0 font-medium text-titl-muted">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 lg:min-w-[11.5rem]">
          {phoneVisible ? (
            <a
              href={`tel:${tel}`}
              className="btn-primary w-full gap-2 whitespace-nowrap text-[15px] sm:text-[17px]"
            >
              <IconPhone className="shrink-0" />
              <span>{row.phone}</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={onShowPhone}
              className="btn-primary w-full gap-2 whitespace-nowrap"
              aria-label={`Show phone number for ${row.businessOrName}`}
            >
              <IconPhone className="shrink-0" />
              <span>Show number</span>
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
      <AnimateIn>
        <header>
          <h1 className="page-title">Local trades &amp; services</h1>
          <p className="page-lead">
            Find electricians, builders, gardeners, and other local contacts in one place. Always
            confirm insurance, references, and pricing before you agree to any work.
          </p>
        </header>
      </AnimateIn>

      <AnimateIn delay={80}>
        <p className="rounded-xl border border-titl-border/50 bg-titl-accent/5 px-4 py-3.5 text-sm leading-relaxed text-titl-muted">
        <span className="font-medium text-titl-text">TiTL does not vet listings.</span> Ratings
        and reviews shown here are for layout only and are not checked by this site.
        </p>
      </AnimateIn>

      <AnimateIn delay={120}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-wrap items-center gap-2 text-sm font-medium text-titl-text">
          <span className="text-titl-muted">Sort by</span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="input-field !mt-0 min-h-[40px] min-w-[12rem] !py-2 text-sm"
          >
            <option value="relevant">Most relevant</option>
            <option value="rating">Highest rated</option>
            <option value="name">Name (A–Z)</option>
            <option value="category">Category</option>
          </select>
        </label>
        <p className="text-sm text-titl-subtle">
          {sorted.length} {sorted.length === 1 ? "listing" : "listings"}
        </p>
        </div>
      </AnimateIn>

      <ul className="space-y-4">
        {sorted.map((row, i) => (
          <AnimateIn key={row.id} as="li" delay={i * 60}>
            <ContactCard
              row={row}
              phoneVisible={revealed[row.id] === true}
              onShowPhone={() => setRevealed((r) => ({ ...r, [row.id]: true }))}
            />
          </AnimateIn>
        ))}
      </ul>
    </div>
  );
}
