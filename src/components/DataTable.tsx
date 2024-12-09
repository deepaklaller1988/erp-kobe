import { useEffect, useState } from "react";
import Table from "react-data-table-component";
import CustomPagination from "./CustomPagination";
import { TableColumn } from "react-data-table-component";

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

export const DataTable = <T,>({ data, columns }: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <>
      <Table
        className="w-full customTable rounded-lg"
        columns={columns}
        data={data}
        pagination={false}
        highlightOnHover
        customStyles={{
          table: {
            style: {
              border: `1px solid "#EBEBEB"`,
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            },
          },
          headCells: {
            style: {
              fontWeight: "bold",
            },
          },
          headRow: {
            style: {
              backgroundColor: "#FFFFFF",
              color: "#000",
              whiteSpace: "normal",
              textOverflow: "unset",
              fontSize: "small",
              textAlign: "center",
              fontWeight: "bold",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            },
          },
          rows: {
            style: {
              padding: "5px 0px",
              color: "black",
              backgroundColor: "#FFFFFF",
              "&:nth-child(2n)": {
                backgroundColor: "#efefef",
              },
              borderBottom: `1px solid "#EBEBEB"`,
            },
          },
        }}
        conditionalRowStyles={[
          {
            when: (row: any) => true,
            style: {
              "&:hover": {
                backgroundColor: "#EBEBEB",
                color: "black",
                outline: "none !important",
              },
            },
          },
        ]}
      />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
