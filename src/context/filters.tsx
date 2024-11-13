import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface IFilters {
  types: string[];
  existence: string;
}

interface IFiltersContext {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

export const FiltersContext = createContext<IFiltersContext>({
  filters: { types: [], existence: "all" },
  setFilters: () => {},
});

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<IFilters>({
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
