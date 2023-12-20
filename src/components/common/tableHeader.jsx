import React, { Component } from "react";

class TableHeader extends Component {
  // Function to handle sorting
  raiseSort = (path) => {
    // Create a copy of the current sortColumn from props
    const sortColumn = { ...this.props.sortColumn };
    // Check if the clicked column is the same as the current sorted column
    if (sortColumn.path === path)
      // If it is, toggle the sorting order (asc or desc)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      // If it's a new column, set the path and reset the order to "asc"
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
