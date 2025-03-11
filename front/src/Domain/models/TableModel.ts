import { RowModel } from "."

export interface TableModel {
    items: RowModel[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}