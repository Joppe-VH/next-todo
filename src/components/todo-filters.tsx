import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type FilterType } from "@/types";

interface TodoFiltersProps {
  currentFilter: FilterType;
  counts: Record<FilterType, number>;
}

interface FilterButtonProps {
  href: string;
  children: React.ReactNode;
  currentFilter: FilterType;
}

function FilterButton({ href, children, currentFilter }: FilterButtonProps) {
  return (
    <Button
      variant={currentFilter === href ? "default" : "outline"}
      size="sm"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export function TodoFilters({ currentFilter, counts }: TodoFiltersProps) {
  return (
    <div className="flex gap-2 justify-center">
      <FilterButton href="/" currentFilter={currentFilter}>
        All ({counts.all})
      </FilterButton>
      <FilterButton href="/?filter=active" currentFilter={currentFilter}>
        Active ({counts.active})
      </FilterButton>
      <FilterButton href="/?filter=completed" currentFilter={currentFilter}>
        Completed ({counts.completed})
      </FilterButton>
    </div>
  );
}
