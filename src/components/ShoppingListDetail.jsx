import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const initialListData = {
  id: 1,
  name: "Weekly Groceries",
  owner: "user1",
  members: ["user2", "user3"],
  items: [
    { id: 1, name: "Milk", resolved: false },
    { id: 2, name: "Bread", resolved: true },
    { id: 3, name: "Eggs", resolved: false },
  ],
};

const ShoppingListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(initialListData);
  const [filterResolved, setFilterResolved] = useState(false);

  const editName = (newName) => setList({ ...list, name: newName });

  const addMember = (member) => setList({ ...list, members: [...list.members, member] });

  const removeMember = (member) =>
    setList({ ...list, members: list.members.filter((m) => m !== member) });

  const leaveList = (member) => removeMember(member);

  const addItem = (itemName) =>
    setList({ ...list, items: [...list.items, { id: list.items.length + 1, name: itemName, resolved: false }] });

  const removeItem = (itemId) =>
    setList({ ...list, items: list.items.filter((item) => item.id !== itemId) });

  const toggleResolved = (itemId) =>
    setList({
      ...list,
      items: list.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    });

  const filteredItems = filterResolved
    ? list.items
    : list.items.filter((item) => !item.resolved);

  // Pie chart data
  const resolvedItemsCount = list.items.filter((item) => item.resolved).length;
  const unresolvedItemsCount = list.items.length - resolvedItemsCount;

  const pieChartData = {
    labels: ["Resolved", "Unresolved"],
    datasets: [
      {
        data: [resolvedItemsCount, unresolvedItemsCount],
        backgroundColor: ["#4CAF50", "#FF5733"],
        hoverBackgroundColor: ["#45a049", "#ff3f2e"],
      },
    ],
  };

  return (
    <div className="list-detail">
      <h2>{list.name}</h2>
      <input
        type="text"
        value={list.name}
        onChange={(e) => editName(e.target.value)}
      />
      <div>
        <h3>Members</h3>
        <ul>
          {list.members.map((member) => (
            <li key={member}>
              {member}
              <button onClick={() => removeMember(member)} className="btn btn-danger">Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={() => addMember(`user${list.members.length + 1}`)} className="btn btn-primary">Add Member</button>
      </div>
      <div>
        <h3>Items</h3>
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id}>
              <span style={{ textDecoration: item.resolved ? "line-through" : "none" }}>
                {item.name}
              </span>
              <button onClick={() => toggleResolved(item.id)} className="btn btn-secondary">
                {item.resolved ? "Unresolve" : "Resolve"}
              </button>
              <button onClick={() => removeItem(item.id)} className="btn btn-danger">Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={() => setFilterResolved(!filterResolved)} className="btn btn-secondary">
          {filterResolved ? "Show Unresolved" : "Show All"}
        </button>
        <button onClick={() => addItem(`Item ${list.items.length + 1}`)} className="btn btn-primary">Add Item</button>
      </div>

      <div>
        <h3>Statistics</h3>
        <Pie data={pieChartData} />
      </div>

      <button onClick={() => navigate("/lists")} className="btn btn-secondary">Back to Overview</button>
    </div>
  );
};

export default ShoppingListDetail;
