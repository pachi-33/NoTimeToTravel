"use client";
import React, { Key } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Switch,
  Tooltip,
  getKeyValue,
  SortDescriptor,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { SearchIcon } from "../../icons/SearchIcon";
import { columns, users } from "./components/data";
import { DeleteIcon } from "../../icons/DeleteIcon";

interface userType {
  id: number;
  name: string;
}

export default function App() {
  // input value
  const [filterValue, setFilterValue] = React.useState("");
  // selected columns
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]) || "all");
  // rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  // select mode, single or multiple
  const [isMultiple, setIsMultiple] = React.useState(false);

  const [showDelete, setShowDelete] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const headerColumns = columns;

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleAddNew = () => {
    setShowAdd(true);
    onAddOpen();
  };

  const handleDeleteUser = (id: number) => {
    console.log(id);
    setShowDelete(true);
    onDeleteOpen();
  };

  const handleDeleteSelected = () => {
    let selectedArray: Array<number> = [];
    if (`${selectedKeys}` == "all") {
      users.forEach((value) => {
        selectedArray.push(value.id);
      });
    } else {
      selectedKeys.forEach((value) => {
        selectedArray.push(value);
      });
    }
    console.log(selectedArray);
  };

  const renderCell = React.useCallback((user: userType, columnKey: Key) => {
    const cellValue = user[columnKey as keyof typeof user];

    switch (columnKey) {
      case "name":
        return (
          <p className="text-bold text-blue-500 text-md capitalize">
            {cellValue}
          </p>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-3">
            <Tooltip color="danger" content="删除审核人员">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  handleDeleteUser(user.id);
                }}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
      setPage(1);
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <div className="flex gap-2 items-center justify-center mr-2">
              <Switch
                className="text-small"
                isSelected={isMultiple}
                onValueChange={setIsMultiple}
              >
                Multiple:
              </Switch>
              <span className="text-small">{isMultiple ? "on" : "off"}</span>
            </div>
            <Button
              className="bg-foreground text-background"
              endContent={<div>+</div>}
              size="sm"
              onClick={handleAddNew}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
    isMultiple,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {isMultiple ? (
          <div className="w-[30%] flex items-center gap-4">
            <span className=" text-small text-default-400">
              {selectedKeys.size >= filteredItems.length ||
              `${selectedKeys}` == "all"
                ? "All items selected"
                : `${selectedKeys.size} of ${filteredItems.length} selected`}
            </span>
            {(selectedKeys.size > 0 || `${selectedKeys}` == "all") && (
              <div className="relative flex items-center gap-4 rounded-full bg-slate-200 px-3 py-1">
                <Tooltip color="danger" content="删除所选">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={handleDeleteSelected}
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            )}
          </div>
        ) : (
          <div className="w-[30%] text-small text-default-400"></div>
        )}
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter, isMultiple]);

  return (
    <div className="relative w-full h-full px-4">
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        className="max-h-[80vh]"
        selectedKeys={selectedKeys}
        selectionMode={isMultiple ? "multiple" : "none"}
        sortDescriptor={sortDescriptor as SortDescriptor}
        isStriped
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={(keys) => {
          console.log(keys);
          setSelectedKeys(keys as Set<never>);
        }}
        onSortChange={(descriptor) => {
          setSortDescriptor(
            descriptor as React.SetStateAction<{
              column: string;
              direction: string;
            }>
          );
        }}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.iid}
              align={column.iid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"暂无审核人员"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {showAdd && (
        <Modal isOpen={isAddOpen} onOpenChange={onAddOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  增加审核人员
                </ModalHeader>
                <ModalBody>
                  <p>rmt</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {showDelete && (
        <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  删除审核人员
                </ModalHeader>
                <ModalBody>
                  <p>rmt</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
