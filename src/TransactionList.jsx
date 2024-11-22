import { useState } from "react";
import { PiPizza, PiGift } from "react-icons/pi";
import { BsSuitcase2 } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";

export default function TransactionList({expenseList, setExpenseList}) {
//   const [expenseList, setExpenseList] = useState([ 
//     { id: 1, title: "Pizza", category: "Food", price: 20, date: "2024-11-20" },
//     { id: 2, title: "Movie", category: "Entertainment", price: 15, date: "2024-11-19" },
//     { id: 3, title: "Taxi", category: "Travel", price: 10, date: "2024-11-18" },
//   ]);

  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editFormData, setEditFormData] = useState(null); // Data being edited

  const handleDelete = (id) => {
    setExpenseList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditClick = (transaction) => {
    setIsEditing(true);
    setEditFormData(transaction); // to Populate the form with the item to edit
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setExpenseList((prev) => prev.map((item) =>
        item.id === editFormData.id ? { ...editFormData } : item
      ));
    setIsEditing(false);
    setEditFormData(null); // Clear the form after editing
  };

  return (
    <div>
      <h2>Transaction List</h2>

        {/* Conditional rendering for no transactions */}
        {expenseList.length === 0 ? (
        <p>No transactions available.</p>
        ) : (

      <ul>
        {expenseList.map((details) => (
          <li
            key={details.id}
            style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
          >
            {details.category === "Food" && <PiPizza style={{ marginRight: "10px" }} />}
            {details.category === "Entertainment" && <PiGift style={{ marginRight: "10px" }} />}
            {details.category === "Travel" && <BsSuitcase2 style={{ marginRight: "10px" }} />}
            <span style={{ marginRight: "10px" }}>{details.title}</span>
            <span style={{ marginRight: "10px" }}>${details.price}</span>
            <span style={{ marginRight: "10px" }}>{details.date}</span>
            
            <button onClick={() => handleDelete(details.id)} style={{ marginRight: "10px" }}>
              <IoMdCloseCircleOutline />
            </button>
            
            <button onClick={() => handleEditClick(details)}>
              <MdOutlineModeEdit />
            </button>
          </li>
        ))}
      </ul>
        )} 

      {/* Edit Form */}
      {isEditing && (
        <form onSubmit={handleEditSubmit} style={{ marginTop: "20px" }}>
          <h3>Edit Transaction</h3>
          <input
            type="text"
            name="title"
            value={editFormData.title}
            onChange={handleEditChange}
            placeholder="Title"
            required
          />
          <input
            type="number"
            name="price"
            value={editFormData.price}
            onChange={handleEditChange}
            placeholder="Price"
            required
          />
          <select
            name="category"
            value={editFormData.category}
            onChange={handleEditChange}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
          </select>
          <input
            type="date"
            name="date"
            value={editFormData.date}
            onChange={handleEditChange}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
