// FIX: Removed invalid file content markers that caused parsing errors.
import React from 'react';
import useI18n from '../hooks/useI18n';
import { TableColumn, TableRow } from '../types';

interface TableProps<T extends TableRow> {
  columns: TableColumn<T>[];
  data: T[];
  // Future additions: onSort, onRowClick, etc.
}

const Table = <T extends TableRow>({ columns, data }: TableProps<T>) => {
  const { t } = useI18n();
  // Basic pagination state (can be expanded)
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 10;
  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                style={{ width: col.width }}
              >
                {t(col.headerKey)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {paginatedData.map((item, rowIndex) => (
            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              {columns.map((col) => (
                <td
                  key={`${item.id}-${String(col.key)}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                >
                  {col.render ? col.render(item, rowIndex) : <span>{String(item[col.key as keyof T] ?? '')}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
       <div className="py-3 px-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
            <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
                Previous
            </button>
            <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            >
                Next
            </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
