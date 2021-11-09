import { reduxForm } from "redux-form";
import Component from "./AddEventCategory";

const initialValues = {
  categoryId:'',
  eventName	:'',
  description:'',
  eventDate:'',
  eventTime:'',
  register:'',
  contactPerson:'',
  photo:'',
  eventRegister: '',
  isActive:true
};

export default reduxForm({
  form: "AddEventCategoryForm",
  initialValues,
})(Component);