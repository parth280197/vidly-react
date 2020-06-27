import React from "react";
const TableHeader = (props) => {
  const {columns, sortColumn: previousSortColumn, onSort} = props;
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
  return (
    <thead>
      <tr>
        {columns.map((c) => (
          <th
            key={c.path || c.key}
            style={{cursor: "pointer"}}
            onClick={() => raiseSort(c.path)}
          >
            {c.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
