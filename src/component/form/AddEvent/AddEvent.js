import React from "react";
import { Field } from "redux-form";
import "./style.css";
import Button from "../../elements/button/Button";
import Text from "../../field/text/Text";

export default function AddEvent(props) {
  const { handleSubmit, isLoading } = props;

  return (
    <>
      <form className='AddEventCategory' onSubmit={handleSubmit}>
        <section>
          <Field
            component={Text}
            placeholder='Nama Kategori'
            name='categoryName'
          />
        </section>
        <section className='form-button'>
          <Button
            label={"Submit"}
            className='find'
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </section>
      </form>
    </>
  );
}