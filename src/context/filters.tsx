import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface IFilters {
  sort: string;
  types: string[];
  existence: string;
}

interface IFiltersContext {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

export const FiltersContext = createContext<IFiltersContext>({
  filters: { sort: "byID", types: [], existence: "all" },
  setFilters: () => {},
});

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<IFilters>({
    sort: "byID",
    types: [],
    existence: "all",
  });

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
