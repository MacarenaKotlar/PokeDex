import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface IFilters {
  search: string;
  sort: string;
  types: string[];
  existence: string;
}

interface IFiltersContext {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

export const FiltersContext = createContext<IFiltersContext>({
  filters: { search: "", sort: "byID", types: [], existence: "all" },
  setFilters: () => {},
});

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<IFilters>({
    search: "",
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
