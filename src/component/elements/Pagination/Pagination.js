import React from 'react';
import queryString from 'querystring';
import { Link } from 'react-router-dom';
import './style.css';
import arrowLeft from '../../../assets/ic-arrow-left.svg';
import arrowRight from '../../../assets/ic-arrow-right.svg';

export default function Pagination(props) {
  const { className, location, meta } = props;
  const { pageNumber, totalPage } = meta;
  const classes = ['root-paginate', className].filter(Boolean).join(' ');
  const toPrevPage = {
    page: pageNumber ? (parseInt(pageNumber) - 1) : 1,
  };
  const toNextPage = {
    page: pageNumber ? (parseInt(pageNumber) + 1) : 2,
  };
  return (
    <section className={classes}>
      <IconArrow
        disabled={pageNumber === 1}
        icon={arrowLeft}
        location={location}
        title="Prev Page"
        to={toPrevPage}
      />
      <PageNumber location={location} meta={meta}  />
      <IconArrow
        disabled={pageNumber >= totalPage}
        icon={arrowRight}
        location={location}
        title="Next Page"
        to={toNextPage}
      />
    </section>
  );
}


export function IconArrow({ disabled, title, icon, to, location }) {
  return (
    <Link className='icon' disabled={disabled} to={getLink(to, location)}>
      <img src={icon} title={title} />
    </Link>
  );
}

export function PageNumber({ meta, location }) {
  const { pageNumber, totalPage } = meta;
  let totalPages = totalPage || 0;
  totalPages = parseInt(totalPages);
  const length = totalPages > 4 ? 4 : totalPages;
  const mainPages = Array.from(Array(length).keys()).map(i => {
    if (totalPages < 4 || pageNumber === 1) {
      return i + 1;
    }
    if (pageNumber === totalPages || pageNumber === totalPages - 1) {
      return (totalPages - (3 - i));
    }
    return pageNumber + i - 1;
  });
  const leftPages = totalPages > 5 && mainPages[0] - 1 > 0 ? [1, '...'] : [];
  const rightPages = totalPages > 5 && totalPages - mainPages[1] > 2 ? ['...', totalPages] : [];
  const pages = leftPages.concat(mainPages, rightPages);

  return (
    pages.map((item, key) => {
      
      const activePage = pageNumber === item && 'active';
      const pageClasses = [['page-number'], activePage].filter(Boolean).join(' ');
      const disabled = typeof item !== 'number';
      const query = {
        page: item 
      };
      return (
        <Link className={pageClasses} disabled={disabled} key={key} to={getLink(query, location)}>
          {item}
        </Link>
      );
    })
  );
}

export function getLink(query, location) {
  const parsedQuery = queryString.parse(location.search.replace('?', ''));
  return {
    pathname: location.pathname,
    search: `?${queryString.stringify({ ...parsedQuery, ...query })}`
  };
}
