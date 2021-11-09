import React from "react";
import TableGrid from "../../elements/Table";
import Button from "../../elements/button/Button";
import moment from "moment";

export default function EventList(props) {
  const { data } = props;

  const col = [
    { id: "no", label: "No", minWidth: 80 },
    { id: "nameCategory", label: "Nama Event", minWidth: 170 },
    { id: "eventDate", label: "Tanggal Event", minWidth: 170 },
    { id: "contactPerson", label: "Kontak Panitia", minWidth: 170 },
    {
      id: "edit",
      label: "Edit/View",
      minWidth: 100,
      align: "left",
    },
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
        no: idx+1,
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
  return(
    <section className='event-list'>
        <section>
          <Button
            className='create-event'
            label='Add Event'
          />
        </section>
     <TableGrid columns={col} rows={row} />
    </section>
  )
}