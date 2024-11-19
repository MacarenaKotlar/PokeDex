import { useContext } from "react";
import { FiltersContext } from "../context/filters";

export function useFilters() {
    const { filters, setFilters } = useContext(FiltersContext);

    if(filters === undefined) throw new Error("filters must be used within a FiltersProvider");
    if(setFilters === undefined) throw new Error("setFilters must be used within a FiltersProvider");
    
    return { filters, setFilters };
  }