import { useState } from "react";
import { useEffect } from "react";
import { API } from "./global.js";
import { BoxModel } from "./BoxModel";
import { PriceListItem } from "./PriceListItem";
import "./PriceHistoryTable.css";

export function PriceHistoryTable() {
  const [users, setUsers] = useState([]);
  const [editItemId, setEditItemId] = useState(null);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${API}/Money`, {
  //       method: "GET",
  //     });
  //     const data = await response.json();
  //     setUsers(data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  function checkAuth(res) {
    if(res.status === 401){
      throw Error ("unauthorized")
    }else{
      return res.json();
    }
  }

  const fetchData = async () => {
    await fetch(`${API}/Money`, {
      method: "GET",
    headers: {
      "x-auth-token": localStorage.getItem("token")
    },
  })
  .then((res) => checkAuth(res))
  .then((data) => setUsers(data))
  .catch((err) => console.log(err));
};

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/Money/${id}`, {
        method: "DELETE",
      });
      alert("Are You Sure Delete");
      fetchData();
    } catch (error) {
      console.error("An error occurred while deleting user data", error);
    }
  };

  const handleEdit = (id) => {
    setEditItemId(id);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
  };

  const onUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`${API}/Money/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Pass the updated data as JSON
      });

      if (response.ok) {
        // Data updated successfully
        fetchData(); // Fetch updated data to refresh the table
        window.location.reload();
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("An error occurred while updating user data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="History"> 
        <h1>Expense History</h1>
        <BoxModel onUpdate={fetchData} />
      </div>

      <table className="tabledata">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Account</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((e) => (
            <PriceListItem
              key={e._id}
              data={e}
              isEditing={editItemId === e._id}
              onEdit={() => handleEdit(e._id)}
              onCancelEdit={handleCancelEdit}
              onDelete={() => handleDelete(e._id)}
              onUpdate={(updatedData) => onUpdate(e._id, updatedData)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
