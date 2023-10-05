import { API } from "./global.js";
import { useFormik } from "formik";
import * as yup from "yup";
import "./PriceListItem.css";

export function PriceListItem({
  data,
  isEditing,
  onEdit,
  onCancelEdit,
  onDelete,
  onUpdate,
}) {
  const textColor = data.category === "expenditure" ? "crimson" : "green";
  const styles = {
    color: textColor,
  };
  const bgstyles = {
    backgroundColor: "red",
    color: "white",
  };

  const initialValues = {
    category: data.category || "",
    amount: data.amount || "",
    cashType: data.cashType || "",
    description: data.description || "",
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
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Update the item with new values using your API
        const response = await fetch(`${API}/Money/${data._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Trigger the parent component's update function
          onUpdate();
          onCancelEdit();
        } else {
          console.error("Failed to update user data");
        }
      } catch (error) {
        console.error("An error occurred while updating user data", error);
      }
    },
  });

  return (
    <tr className="tablecon">
      <td style={styles}>
        {isEditing ? (
          <div>
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
        ) : (
          data.category
        )}
      </td>
      <td style={styles}>
        {isEditing ? (
          <input
            type="text"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
        ) : (
          data.amount
        )}
      </td>
      <td style={styles}>
        {isEditing ? (
          <input
            type="text"
            name="cashType"
            value={formik.values.cashType}
            onChange={formik.handleChange}
          />
        ) : (
          data.cashType
        )}
      </td>
      <td style={styles}>
        {isEditing ? (
          <input
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        ) : (
          data.description
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button onClick={() => formik.handleSubmit()}>Update</button>
            <button onClick={onCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete} style={bgstyles} className="delete">
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
