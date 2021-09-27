import React from "react";
import "./style.css";

export default function TabHeader(props) {
  const { activeIndex, navItems, onClick } = props;

  return (
    <>
      <nav className='tabHeader'>
        {navItems.map((item, idx) => {
          const itemClass = `item ${idx === activeIndex ? "itemActive" : ""}`;
          return (
            <div className={itemClass} key={idx} onClick={onClick(idx)}>

              <p><span>{item.idx}</span> {item.name}</p>
            </div>
          );
        })}
      </nav>
      
    </>
  );
}
