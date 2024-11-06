import { createContext, Dispatch, SetStateAction, useState } from "react";

interface IFilters {
  existence: string;
}

interface IFiltersContext {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

export const FiltersContext = createContext<IFiltersContext>({
  filters: { existence: "all" },
  setFilters: () => {},
});

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<IFilters>({
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
