export const thousand = val => (
  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
);

export const rupiah = val => (`Rp. ${thousand(val)}`);

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
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const capitalizedArray = value => {
  const newArray = []
  const valueArr = value.split(' ')
  for (let i in valueArr){
    newArray.push(capitalized(valueArr[i]))
  }
  return newArray.join(' ');
};


