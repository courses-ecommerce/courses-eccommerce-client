import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import classNames from "classnames";
import React, { ReactNode, useState } from "react";
import TableNone from "./TableNone/TableNone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import "./Table.scss";

interface TableProps {
  title?: string;
  columnsData?: GridColDef[];
  rowsData?: any;
  className?: string;
  isLoading?: boolean;
  btns?: ReactNode;
  handleAddItem?: () => void;
  onModifyItem?: (id: string | number) => void;
  onDeleteSelectMultiItem?: (multiSelect: string[] | number[]) => void;
  onDeleteItem?: (id: string | number) => void;
  total?: number;
}

const Table: React.FC<TableProps> = ({
  title,
  className,
  btns,
  rowsData,
  columnsData = [],
  isLoading = false,
  total = 0,
  handleAddItem,
  onDeleteSelectMultiItem,
  onDeleteItem,
  onModifyItem,
}) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [multiSelect, setMultiSelect] = useState<string[] | number[]>([]);

  const actions: GridColDef = {
    field: "actions",
    headerName: "Thao tác",
    sortable: false,
    type: "actions",
    flex: 1,
    renderCell: ({ id }) => {
      return (
        <div style={{ display: "flex", gap: 20 }}>
          <Tooltip onClick={() => onDeleteItem?.(id)} title="Xoá">
            <DeleteForeverIcon sx={{ cursor: "pointer" }} />
          </Tooltip>

          <Tooltip
            title="Cập nhật thông tin"
            onClick={() => onModifyItem?.(id)}
          >
            <EditIcon sx={{ cursor: "pointer" }} />
          </Tooltip>
        </div>
      );
    },
  };

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
        className="data-grid"
        autoHeight
        checkboxSelection
        disableColumnMenu
        components={{
          // Toolbar: TableToolBar,
          // Pagination: TablePagination,
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
        rows={rowsData}
        page={page}
        columns={[...columnsData, actions]}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 15]}
        density="standard"
      />
    </div>
  );
};
export default Table;
