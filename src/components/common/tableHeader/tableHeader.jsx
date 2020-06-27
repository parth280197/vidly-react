import React from "react";
const TableHeader = ({columns, sortColumn: previousSortColumn, onSort}) => {
  const raiseSort = (path) => {
    const sortColumn = {...previousSortColumn};
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== previousSortColumn.path) return null;
    if (previousSortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map((c) => (
          <th
            key={c.path || c.key}
            style={{cursor: "pointer"}}
            onClick={() => raiseSort(c.path)}
          >
            {c.label} {renderSortIcon(c)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
