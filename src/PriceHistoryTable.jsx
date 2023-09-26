import { useState, useEffect } from "react";
import { API } from "./global.js";
import { useFormik } from "formik";
import * as yup from "yup";

export function PriceHistoryTable() {
  const [editingId, setEditingId] = useState(null);

  const initialValues = {
    category: "",
    amount: "",
    cashType: "",
    description: "",
  };

  const validationSchema = yup.object({
    category: yup.string().required("Category is required"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .required("Amount is required"),
    cashType: yup.string().required("Cash Type is required"),
    description: yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (editingId) {
        handleEdit(editingId, values);
      } else {
        addExpense(values);
      }
    },
  });
const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token is missing.");
        return;
      }

      const response = await fetch(`${API}/Money`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data (HTTP ${response.status})`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  const addExpense = async (newExpense) => {
    try {
      const response = await fetch(`${API}/Money`, {
        method: "POST",
        body: JSON.stringify([newExpense]),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User data created successfully");
        formik.resetForm();
        fetchUsers();
      } else {
        console.error("Failed to create user data");
      }
    } catch (error) {
      console.error("An error occurred while creating user data", error);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await fetch(`${API}/Money/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User data updated successfully");
        formik.resetForm();
        setEditingId(null);
        fetchUsers();
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("An error occurred while updating user data", error);
    }
  };

  const startEdit = (id, userData) => {
    formik.setValues({
      category: userData.category,
      amount: userData.amount,
      cashType: userData.cashType,
      description: userData.description,
    });
    setEditingId(id);
  };

  const cancelEdit = () => {
    formik.resetForm();
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/Money/${id}`, {
        method: "DELETE",
      });
      alert("Are You Sure Delete");
      fetchUsers();
    } catch (error) {
      console.error("An error occurred while deleting user data", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div>
        <h2>Expense Tracker</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="radio"
              name="category"
              value="income"
              checked={formik.values.category === "income"}
              onChange={formik.handleChange}
            />
            <label htmlFor="income">Income</label>
            <input
              type="radio"
              name="category"
              value="expenditure"
              checked={formik.values.category === "expenditure"}
              onChange={formik.handleChange}
            />
            <label htmlFor="expenditure">Expenditure</label>
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Amount"
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className="error">{formik.errors.amount}</div>
            ) : null}
          </div>
          <div>
            <label>Cash Type:</label>
            <input
              type="radio"
              name="cashType"
              value="Cash"
              checked={formik.values.cashType === "Cash"}
              onChange={formik.handleChange}
            />
            <label>Cash</label>
            <input
              type="radio"
              name="cashType"
              value="Gpay"
              checked={formik.values.cashType === "Gpay"}
              onChange={formik.handleChange}
            />
            <label>Gpay</label>
            <input
              type="radio"
              name="cashType"
              value="Phonepe"
              checked={formik.values.cashType === "Phonepe"}
              onChange={formik.handleChange}
            />
            <label>Phonepe</label>
            <input
              type="radio"
              name="cashType"
              value="Others"
              checked={formik.values.cashType === "Others"}
              onChange={formik.handleChange}
            />
            <label>Others</label>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Description"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="error">{formik.errors.description}</div>
            ) : null}
          </div>
          <button type="submit">{editingId ? "Save" : "Submit"}</button>
          {editingId && (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>
      </div>
      <h1>Expense History</h1>
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
              onEdit={() => startEdit(e._id, e)}
              onDelete={() => handleDelete(e._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PriceListItem({ data, onEdit, onDelete }) {
  const textColor = data.category === "expenditure" ? "crimson" : "green";

  const styles = {
    color: textColor,
  };

  const bgstyles = {
    backgroundColor: "red",
    color: "white",
  };

  return (
    <tr className="tablecon">
      <td style={styles}>{data.category}</td>
      <td style={styles}>{data.amount}</td>
      <td style={styles}>{data.cashType}</td>
      <td style={styles}>{data.description}</td>
      <td>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} style={bgstyles} className="delete">
          Delete
        </button>
      </td>
    </tr>
  );
}
