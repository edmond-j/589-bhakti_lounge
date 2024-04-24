import React from "react";

function ItemList({ items, onSelectItem }) {
  if (!items || items.length === 0) {
    return <p>Loading...</p>; // 或其他加载指示器
  }
  return (
    <div className="mgt-list">
      {/* <p>{items[0].name}</p> */}
      {items.map((item) => (
        <div key={item.id} onClick={() => onSelectItem(item)}>{item.name}</div>
      ))}
      <button>Add New</button>
    </div>
  );
}

export default ItemList;
