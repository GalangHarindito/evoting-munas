import { reduxForm } from "redux-form";
import Component from "./AddEventCategory";

const initialValues = {
  categoryName:'',
  isActive:true
};

export default reduxForm({
  form: "AddEventCategoryForm",
  initialValues,
})(Component);