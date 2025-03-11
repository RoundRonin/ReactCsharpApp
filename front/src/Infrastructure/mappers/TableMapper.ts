import { TableModel } from "@/Domain";
import { RowMapper } from "./RowMapper";

export const TableMapper = (data: any): TableModel => {
    return {
        items: data.items.map(RowMapper),
        totalItems: data.totalItems,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
    };
};