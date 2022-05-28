import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import classNames from "classnames";
import React, { ReactNode, useState } from "react";
import "./Table.scss";
import TableNone from "./TableNone/TableNone";

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector />
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

// function CustomPagination() {
//   const apiRef = useGridApiContext();
//   const page = useGridSelector(apiRef, gridPageSelector);
//   const pageCount = useGridSelector(apiRef, gridPageCountSelector);

//   return (
//     <Pagination
//       color="primary"
//       count={pageCount}
//       page={page + 1}
//       onChange={(event, value) => apiRef.current.setPage(value - 1)}
//     />
//   );
// }

interface TableProps {
  title?: string;
  columnsData?: GridColDef[];
  rowsData?: any;
  className?: string;
  isLoading?: boolean;
  btns?: ReactNode;
  handleAddItem?: () => void;
  onDeleteSelectMultiItem?: (multiSelect: any) => any;
}

const Table: React.FC<TableProps> = ({
  title,
  className,
  btns,
  rowsData,
  columnsData = [],
  isLoading = false,
  handleAddItem,
  onDeleteSelectMultiItem,
}) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [multiSelect, setMultiSelect] = useState<string[] | number[]>([]);

  const handleChangePage = (newPage: number) => {
    // console.log("newPage", newPage);
    setPage(newPage);
  };

  const handlePageSizeChange = (pageSize: number) => {
    // console.log("size page", pageSize);
    setPageSize(pageSize);
    setPage(0);
  };
  const handleDeleteMultiSelectItem = () => {
    onDeleteSelectMultiItem?.(multiSelect);
  };

  return (
    <div className={classNames(className, "table-container")}>
      <span className="title">{title}</span>
      <div className="btns-handle">
        <Button variant="contained" color="secondary" onClick={handleAddItem}>
          Thêm thông tin
        </Button>
        {btns}
        {multiSelect.length > 0 && (
          <Button
            variant="contained"
            color="warning"
            onClick={handleDeleteMultiSelectItem}
          >
            Xoá thông tin
          </Button>
        )}
      </div>
      <DataGrid
        autoHeight
        components={{
          //   Toolbar: CustomToolbar,
          //   Pagination: CustomPagination,
          NoRowsOverlay: TableNone,
        }}
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Số lượng hiển thị",
          },
        }}
        // onRowClick={(e) => console.log(e)}
        // onSortModelChange={(e) => console.log(e)}
        onSelectionModelChange={(id: any) => setMultiSelect(id)}
        loading={isLoading}
        rowSpacingType="border"
        onPageChange={handleChangePage}
        onPageSizeChange={handlePageSizeChange}
        // rowHeight={50}
        rows={rowsData}
        page={page}
        columns={columnsData}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 15]}
        checkboxSelection
        density="standard"
      />
    </div>
  );
};
export default Table;
