import { API } from "./global.js";
import { useFormik } from "formik";
import * as yup from "yup";
import "./BoxModel.css"

export function BoxModel({ onUpdate }) {
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
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      addExpense(values);
    },
  });

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
        window.location.reload();
        onUpdate();
      } else {
        console.error("Failed to create user data");
      }
    } catch (error) {
      console.error("An error occurred while creating user data", error);
    }
  };

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@mdo"
      >
        Add Expense
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add Expense
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="category" className="col-form-label">
                    Category: 
                  </label>
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
                <div className="form-group">
                  <label htmlFor="amount" className="col-form-label">
                    Amount:
                  </label>
                  <input
                    className="form-control"
                    id="amount"
                    type="text"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Amount"
                  />
                  {formik.touched.amount && formik.errors.amount ? (
                    <div>{formik.errors.amount}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label className="col-form-label">Cash Type:</label>
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
                <div className="form-group">
                  <label htmlFor="description" className="col-form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  ></textarea>
                  {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>
                  ) : null}
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
