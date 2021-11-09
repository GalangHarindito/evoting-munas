import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export default function Accordions(props) {
  const { data } = props;

  return (
    <div>
      {data &&
        data.map((el, idx) => {
          return (
            <Accordion keys={idx} style={{marginBottom: '0.85rem'}}>
              <AccordionSummary
                //expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <p>Q : <b style={{fontWeight:'500', fontSize:'0.9rem'}}>{el.question}</b></p>
              </AccordionSummary>
              <AccordionDetails>
                <p>A : {el.answer}</p>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}
