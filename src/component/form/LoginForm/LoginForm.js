import React from "react";
import { Field } from "redux-form";
import "./style.css";
import Button from "../../elements/button/Button";
import Text from "../../field/text/Text";
import Password from "../../field/password/Password";
import { Link } from "react-router-dom";
//import DropdownField from "../../elements/field/dropdown/Dropdown";
//import RadioGroup from "../../elements/field/radioGroup/RadioGroup";

export default function LoginForm(props) {
  const { handleSubmit, isLoading } = props;

  return(
    <>

       <form className="loginForm" onSubmit={handleSubmit} >
         
      <section>
        <Field
          component={Text}
          label="Email"
          name="email"
        />
         </section>
        <section>
          <Field
          component={Password}
          label="Password"
          name="password"
        />
        </section>
        <section>
         <Link to='/forgot-password'>Lupa Password ?</Link> 
        </section>
        
        
      <section className='form-button'>
        <Button label={'Login'} onSubmit={handleSubmit} isLoading={isLoading} />
      </section>
    </form>
    </>
  )
}