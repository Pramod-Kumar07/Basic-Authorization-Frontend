import type { ReactNode } from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowKey?: (row: T, index: number) => string | number;
  emptyMessage?: string;
}

const Table = <T,>({
  data,
  columns,
  getRowKey,
  emptyMessage = "No data found",
}: TableProps<T>) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 ${
                    column.className ?? ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={getRowKey ? getRowKey(row, index) : index}
                  className="transition hover:bg-slate-50"
                >
                  {columns.map((column) => {
                    const value = row[column.key];

                    return (
                      <td
                        key={String(column.key)}
                        className={`px-6 py-4 text-slate-700 ${
                          column.className ?? ""
                        }`}
                      >
                        {column.render
                          ? column.render(value, row)
                          : String(value ?? "")}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
