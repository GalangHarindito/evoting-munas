import React, { useState } from "react";
import TableGrid from "../../elements/Table";
import moment from "moment";
import Button from "../../elements/button/Button";
import "./style.css";
import AddEventCategory from "../../form/AddEventCategory";

export default function EventCategory(props) {
  const { data, submit } = props;
  const [add, setAdd] = useState(false);
  const col = [
    { id: "nameCategory", label: "Nama Category", minWidth: 170 },
    //{
    //  id: "edit",
    //  label: "Edit Category",
    //  minWidth: 170,
    //  align: "left",
    //},
    {
      id: "input",
      label: "Tanggal Input",
      minWidth: 170,
      align: "left",
    },
    {
      id: "delete",
      label: "Action",
      minWidth: 50,
      align: "left",
    },
  ];

  const row = [];

  const dataRow = () => {
    data.map((el, idx) => {
      //const size = 15
      //let b = idx+1;
      //if ( page > 1 ) {
      //  b = ( idx+1 )+(( page - 1 ) * size );
      //}

      const obj = {
        nameCategory: el.categoryName,
        input: moment(el.createdAt).format("DD MMM YYYY"),
        //detail: (
        //  <p
        //    onClick={() => {
        //      history.push(`/caketum?id=${el.id}`);

        //    }}
        //    className='table-link'
        //  >
        //    Detail/Ubah
        //  </p>
        //),
        delete: <Button label={"Delete"} className='delete' />,
      };
      return row.push(obj);
    });
  };
  dataRow();

  return (
    <section className='event-category'>
      <section>
        <section style={{ visibility: add ? "visible" : "hidden" }}>
          <AddEventCategory onSubmit={value => submit(value)} />
        </section>
        <section>
          <Button
            className='create-event'
            label='Add'
            onClick={() => setAdd(true)}
          />
        </section>
      </section>

      <TableGrid columns={col} rows={row} />
    </section>
  );
}
