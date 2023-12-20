import React, { Component } from "react";

class GenresTable extends Component {
  render() {
    const { items, textProperty, valueProperty, selectedItem, onItemSelect } =
      this.props;

    return (
      <nav>
        <ul className="list-group">
          {items.map((item) => (
            <li
              onClick={() => onItemSelect(item)}
              key={item[valueProperty]}
              className={
                item === selectedItem
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {item[textProperty]}
              <button
                onClick={() => this.props.onDelete(item)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

// Default props for GenresTable
GenresTable.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default GenresTable;
