export const thousand = val => (
  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
);

export const rupiah = val => (`Rp. ${thousand(val)}`);
export const time = new Date(`12/17/2021 00:00:00 GMT+0700`);
export const afterTime = new Date(`12/17/2021 16:00:00 GMT+0700`);
export const registerTime = new Date(`12/15/2021 12:00:00 GMT+0700`);

export const fileAccept = arr => {
  let val = [];
  arr.map((item, i) => {
    const file = item.split('/');
    val += file[1].toUpperCase();
    if (i+1 < arr.length){
      val += ', ';
    }
    return null
  });
  return val;
};

export const convertOptions = arr => {
  let opt = [];
  arr.map((item) => {
    if (!item.key) {
      opt.push({ text:item.label, value:item.value, key:item.value });
    } else {
      opt.push(item);
    }
    return null
  });

  return opt;
};

export const capitalized = value => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const capitalizedArray = value => {
  const newArray = []
  const valueArr = value.split(' ')
  for (let i in valueArr){
    newArray.push(capitalized(valueArr[i]))
  }
  return newArray.join(' ');
};


export const angkatanKuliah = [
  { text: 1961, value:1961 },
  { text: 1962, value:1962 },
  { text: 1963, value:1963 },
  { text: 1964, value:1964 },
  { text: 1965, value:1965 },
  { text: 1966, value:1966 },
  { text: 1967, value:1967 },
  { text: 1968, value:1968 },
  { text: 1969, value:1969 },
  { text: 1970, value:1970 },
  { text: 1971, value:1971 },
  { text: 1972, value:1972 },
  { text: 1973, value:1973 },
  { text: 1974, value:1974 },
  { text: 1975, value:1975 },
  { text: 1976, value:1976 },
  { text: 1977, value:1977 },
  { text: 1978, value:1978 },
  { text: 1979, value:1979 },
  { text: 1980, value:1980 },
  { text: 1981, value:1981 },
  { text: 1982, value:1982 },
  { text: 1983, value:1983 },
  { text: 1984, value:1984 },
  { text: 1985, value:1985 },
  { text: 1986, value:1986 },
  { text: 1987, value:1987 },
  { text: 1988, value:1988 },
  { text: 1989, value:1989 },
  { text: 1990, value:1990 },
  { text: 1991, value:1991 },
  { text: 1992, value:1992 },
  { text: 1993, value:1993 },
  { text: 1994, value:1994 },
  { text: 1995, value:1995 },
  { text: 1996, value:1996 },
  { text: 1997, value:1997 },
  { text: 1998, value:1998 },
  { text: 1999, value:1999 },
  { text: 2000, value:2000 },
  { text: 2001, value:2001 },
  { text: 2002, value:2002 },
  { text: 2003, value:2003 },
  { text: 2004, value:2004 },
  { text: 2005, value:2005 },
  { text: 2006, value:2006 },
  { text: 2007, value:2007 },
  { text: 2008, value:2008 },
  { text: 2009, value:2009 },
  { text: 2010, value:2010 },
  { text: 2011, value:2011 },
  { text: 2012, value:2012 },
  { text: 2013, value:2013 },
  { text: 2014, value:2014 },
  { text: 2015, value:2015 },
  { text: 2016, value:2016 },
  { text: 2017, value:2017 },
  { text: 2018, value:2018 },
]

export const titleSummary  = title => {
  switch(title) {
    case 'countAllDpt' : return 'Total DPT';
    case 'countAllDptVerified' : return 'Total DPT Terverifikasi';
    case 'countAllDptUnverified' : return 'Total DPT Belum Terverifikasi';
    case 'countAllDptVoted' : return 'Total DPT Voting';
    case 'countAllDptUnvoted' : return 'Total DPT Belum Voting';
    default : return '';
  }
}