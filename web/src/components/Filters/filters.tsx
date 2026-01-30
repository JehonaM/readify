"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { TaxonomyTerm } from "@/types/cms";


interface FiltersProps {
  taxonomies: TaxonomyTerm[];
}

export function Filters({ taxonomies }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected = searchParams.getAll("tax");

  const grouped: Record<string, TaxonomyTerm[]> = {
    genre: [],
    audience: [],
    language: [],
  };

  taxonomies.forEach((t) => grouped[t.fields.type].push(t));

  const toggleTaxonomy = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selected.includes(id)) {
      params.delete("tax");
      selected.filter((t) => t !== id).forEach((t) => params.append("tax", t));
    } else {
      params.append("tax", id);
    }

    params.delete("page");
    router.push(`/library?${params.toString()}`);
  };

  return (
    <aside className="w-60 p-4 border rounded space-y-4">
      {(["genre", "audience", "language"] as const).map((type) => (
        <fieldset key={type}>
          <legend className="font-semibold mb-2 capitalize">{type}</legend>
          <div className="flex flex-col gap-1">
            {grouped[type].map((term) => {
              const isSelected = selected.includes(term.sys.id);
              return (
                <label
                  key={term.sys.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleTaxonomy(term.sys.id)}
                  />
                  <span>{term.fields.title}</span>
                  <span className="text-gray-400 ml-auto text-xs">
                    {term.fields["count"] ?? 0}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </aside>
  );
}
