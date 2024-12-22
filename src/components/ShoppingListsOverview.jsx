import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const initialLists = [
  { id: 1, name: "Weekly Groceries", owner: "user1", items: 3 },
  { id: 2, name: "Party Supplies", owner: "user2", items: 5 },
];

const ShoppingListsOverview = () => {
  const [lists, setLists] = useState(initialLists);
  const navigate = useNavigate();

  const createList = () => {
    const newList = {
      id: lists.length + 1,
      name: `New List ${lists.length + 1}`,
      owner: "user1",
      items: 0,
    };
    setLists([...lists, newList]);
  };

  // Bar chart data
  const barChartData = {
    labels: lists.map((list) => list.name),
    datasets: [
      {
        label: "Number of Items",
        data: lists.map((list) => list.items),
        backgroundColor: "#007bff",
        hoverBackgroundColor: "#0056b3",
      },
    ],
  };

  return (
    <div className="lists-overview">
      <button onClick={createList} className="btn btn-primary">Create List</button>
      <ul>
        {lists.map((list) => (
          <li key={list.id} className="list-item">
            <span>{list.name}</span>
            <button onClick={() => navigate(`/lists/${list.id}`)} className="btn btn-secondary">View</button>
          </li>
        ))}
      </ul>

      <div>
        <h3>Statistics</h3>
        <Bar data={barChartData} />
      </div>
    </div>
  );
};

export default ShoppingListsOverview;
