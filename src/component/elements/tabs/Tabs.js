import React from 'react';
import queryString from 'querystring'; 
import TabHeader from '../tabHeader/TabHeader';
import { useHistory, useLocation } from 'react-router-dom';

export default function Tabs(props) {
  const { navItems, tabsName } = props.data;

  const history = useHistory();
  const { search } = useLocation();
  console.log(useLocation())
  const { tab } = queryString.parse(search.replace('?', ''));
  const { edit } = queryString.parse(search.replace('?', ''));
  let activeIndex = navItems.findIndex(i => i.value === tab || i.value === edit);
  const onClick = (idx) => () => {
    const newQuery = queryString.stringify({ [tabsName]: navItems[idx].value });
    history.push(`?${newQuery}`);
  };

  activeIndex = (activeIndex>-1) ? activeIndex : 0;

  return (
    <TabHeader activeIndex={parseInt(activeIndex)} navItems={navItems} onClick={onClick}/>
  );

}