// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import classNames from "classnames";
import React, { ReactNode, useState } from "react";
import TableNone from "./TableNone/TableNone";
import "./Table.scss";

interface TableProps {
  title?: string;
  titleBtnAdd?: string;
  titleBtnMultiDelete?: string;
  columnsData?: GridColDef[];
  rowsData?: any;
  className?: string;
  isLoading?: boolean;
  isCheckBoxSelection?: boolean;
  btnHandle?: ReactNode;
  btnSearch?: ReactNode;
  getRowId?: (rowId: any) => any;
  onPageSize?: (pageSize: string | number) => void;
  onPage?: (page: string | number) => void;
  total?: number;
  handleAddItem?: () => void;
  onModifyItem?: (id: string | number) => void;
  onViewItemDetail?: (id: string | number) => void;
  onDeleteSelectMultiItem?: (multiSelect: string[] | number[]) => void;
  onDeleteItem?: (id: string | number) => void;
}

const Table: React.FC<TableProps> = ({
  title,
  className,
  btnHandle,
  btnSearch,
  titleBtnAdd = "Thêm mới",
  titleBtnMultiDelete = "Xoá thông tin",
  rowsData,
  columnsData = [],
  isLoading = false,
  isCheckBoxSelection = true,
  onPageSize,
  onPage,
  getRowId,
  total = 0,
  handleAddItem,
  onDeleteSelectMultiItem,
  // onDeleteItem,
  onModifyItem,
  onViewItemDetail,
}) => {
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
          {/* <Tooltip onClick={() => onDeleteItem?.(id)} title="Xoá">
            <DeleteForeverIcon sx={{ cursor: "pointer" }} />
          </Tooltip> */}
          <Tooltip
            title="Cập nhật thông tin"
            onClick={() => onModifyItem?.(id)}
          >
            <EditIcon sx={{ cursor: "pointer" }} />
          </Tooltip>
          <Tooltip
            title="Thông tin chi tiết"
            onClick={() => onViewItemDetail?.(id)}
          >
            <InfoIcon sx={{ cursor: "pointer" }} />
          </Tooltip>
        </div>
      );
    },
  };

  const handleChangePage = (newPage: number) => {
    // console.log("newPage", newPage);
    onPage?.(newPage + 1);
    // setPage(newPage + 1);
  };

  const handlePageSizeChange = (pageSize: number) => {
    // console.log("size page", pageSize);
    onPageSize?.(pageSize);
    setPageSize(pageSize);
    // setPage(1);
  };
  const handleDeleteMultiSelectItem = () => {
    onDeleteSelectMultiItem?.(multiSelect);
  };

  return (
    <div className={classNames(className, "table-container")}>
      <span className="title">{title}</span>

      <div className="btns">
        <Box className="search">{btnSearch}</Box>
        <Box className="handle">
          <Button variant="contained" color="secondary" onClick={handleAddItem}>
            {titleBtnAdd}
          </Button>
          {btnHandle}

          {multiSelect.length > 0 && (
            <Button
              variant="contained"
              color="warning"
              onClick={handleDeleteMultiSelectItem}
            >
              {titleBtnMultiDelete}
            </Button>
          )}
        </Box>
      </div>
      <DataGrid
        className="data-grid"
        getRowId={getRowId}
        autoHeight
        checkboxSelection={isCheckBoxSelection}
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
        onSelectionModelChange={(id: any) => setMultiSelect(id)}
        loading={isLoading}
        rowSpacingType="border"
        onPageChange={handleChangePage}
        onPageSizeChange={handlePageSizeChange}
        rows={rowsData?.length > 0 ? rowsData : []}
        columns={[...columnsData, actions]}
        // page={page}
        pageSize={pageSize}
        rowCount={total}
        paginationMode="server"
        rowsPerPageOptions={[5, 10, 15]}
        density="standard"
        pagination
      />
    </div>
  );
};
export default Table;
