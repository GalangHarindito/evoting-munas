import React from "react";
import { Field } from "redux-form";
import "./style.css";
import Button from "../../elements/button/Button";
import Text from "../../field/text";
import { Link } from "react-router-dom";

export default function ForgotForm(props) {
  const { handleSubmit, isLoading } = props;

  return(
    <>
       <form className="forgotForm" onSubmit={handleSubmit} >  
      <section>
        <Field
          component={Text}
          label="Email"
          name="email"
        />
         </section>
       
      <section className='forgot-form-button'>
        <Link to='/login'>Kembali ke Login</Link>
        <Button label={'Request Password'} onSubmit={handleSubmit} isLoading={isLoading} />
      </section>
    </form>
    </>
  )
}