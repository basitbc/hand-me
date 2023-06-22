
export const serviceCategory = [
  {
    id: 1,
    title: 'Hair Saloon',
    imageName:'logo.png',
    code:'Sublime-90035',
    codes: 90035,
    available:'Mumbai',
    style:'Sublime',
    price:99,
    qty: 1,
  },
  {
    id: 2,
    title: 'Civil Workers',
    imageName:'logo.png',
    code:'Sublime-90036',
    codes: 90036,
    available:'Mumbai',
    style:'Sublime',
    price:99,
    qty: 1,
  },
  {
    id: 3,
    title: 'Gym',
    imageName:'logo.png',
    code:'Sublime-90037',
    codes: 90037,
    available:'Mumbai',
    style:'Sublime',
    price:99,
    qty: 1,
  },
  {
    id: 4,
    title: 'Hardware Shop Workers',
    imageName:'logo.png',
    code:'Sublime-90038',
    codes: 90038,
    available:'Mumbai',
    style:'Sublime',
    price:99,
    qty: 1,
  },
  {
    id: 5,
    title: 'General Store Worker',
    imageName:'logo.png',
    code:'Sublime-90039',
    codes: 90039,
    available:'Mumbai',
    style:'Sublime',
    price:99,
    qty: 1,
  },
  {
    id: 6,
    title: 'Office Staff',
    imageName:'logo.png',
    code:'Sublime-90040',
    codes: 90040,
    available:'Mumbai',
    style:'Sublime',
    price:99,
    qty: 1,
  },
  {
    id: 7,
    title: 'Medical Clinic Attender',
    imageName:'logo.png',
    code:'Sublime-90041',
    codes: 900401,
    available:'Mumbai',
    style:'Sublime',
    price:99,
    qty: 1,
  },
  {
    id: 8,
    title: 'Accounts Staff',
    imageName:'logo.png',
    code:'Sublime-90042',
    available:'Mumbai',
    style:'Sublime',
    price:99,
    qty: 1,
  },
  {
    id: 9,
    title: 'Real Estate Staff',
    imageName:'logo.png',
    code:'Sublime-90043',
    available:'Mumbai',
    style:'Sublime',
    price:99,
    qty: 1,
  },
  {
    id: 10,
    title: 'Steel Manufacture Labour',
    imageName:'logo.png',
    code:'Sublime-90044',
    available:'Mumbai',
    style:'Sublime',
    price:99,
    qty: 1,
  },
  {
    id: 11,
    title: 'Restaurant or Cafe Workers',
    imageName:'logo.png',
    code:'Sublime-90045',
    available:'Mumbai',
    style:'Sublime',
    price:99,
    qty: 1,
  },
];

export const Orders = [
  {
    id: 1,
    product: 'Sublime',
    price:99,
    qty: 1,
    status: 'in Process'
  },
  {
    id: 2,
    product: 'Sublime',
    price:99,
    qty: 1,
    status: 'in Process'
  },
];

export const ProductList = [
  {
    id: 1,
    title: 'Hair Saloon',
    price:99
  },
  {
    id: 2,
    title: 'Civil Workers',
    price:99
  },
  {
    id: 3,
    title: 'Gym',
    price:99
  },
  {
    id: 4,
    title: 'Hardware',
    price:99
  },
  {
    id: 5,
    title: 'General Store',
    price:99
  },
  {
    id: 6,
    title: 'Office Staff',
    price:99
  },
  {
    id: 7,
    title: 'Medical Clinic Attender',
    price:99
  },
  {
    id: 8,
    title: 'Accounts Staff',
    price:99
  }
];

export const FavouriteList = [
  {
    id: 1,
    product: 'Sublime',
    price:'99'
  },
 
];


export const CartItem = [
  {
    id: 1,
    product: 'Sublime',
    price:99,
    qty: 1
  },
  
];


export const onOrder = (items) => {
  let finalItem = [...Orders, ...items]
  return  finalItem
}

export const onCart = (item,items,type) => {
  let finalItem
  if(type === 0) {
   finalItem  = [...CartItem,...items]
  } else {

  }
}