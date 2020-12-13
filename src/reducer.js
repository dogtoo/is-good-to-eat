export const initialState = {
  currentUser: {},
  menu: {
    //menu因為資料固定所以不用放db
    hamburg: {
      menu_name: "hamburg",
      menu_cname: "漢堡",
      meals: [
        {
          meal_cname: "牛肉漢堡",
          meal_name: "beefburg",
          meal_price: 60,
          meal_image_url:
            "https://img.ltn.com.tw/Upload/food/page/2017/01/01/170101-5076-0-CGh2b.jpg",
        },
        {
          meal_cname: "牛肉漢堡",
          meal_name: "beefburg",
          meal_price: 60,
          meal_image_url:
            "https://img.ltn.com.tw/Upload/food/page/2017/01/01/170101-5076-0-CGh2b.jpg",
        },
        {
          meal_cname: "牛肉漢堡",
          meal_name: "beefburg",
          meal_price: 60,
          meal_image_url:
            "https://img.ltn.com.tw/Upload/food/page/2017/01/01/170101-5076-0-CGh2b.jpg",
        },
        {
          meal_cname: "牛肉漢堡",
          meal_name: "beefburg",
          meal_price: 60,
          meal_image_url:
            "https://img.ltn.com.tw/Upload/food/page/2017/01/01/170101-5076-0-CGh2b.jpg",
        },
      ],
    },
    pizza: {
      menu_name: "pizza",
      menu_cname: "披薩",
      meals: [
        {
          meal_cname: "牛肉披薩",
          meal_name: "beefpizza",
          meal_price: 150,
          meal_image_url:
            "https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/vimdb/242141.jpg",
        },
        {
          meal_cname: "豬肉披薩",
          meal_name: "porkpizza",
          meal_price: 130,
          meal_image_url:
            "https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/vimdb/242133.jpg",
        },
        {
          meal_cname: "牛肉披薩",
          meal_name: "beefpizza",
          meal_price: 150,
          meal_image_url:
            "https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/vimdb/242141.jpg",
        },
        {
          meal_cname: "豬肉披薩",
          meal_name: "porkpizza",
          meal_price: 130,
          meal_image_url:
            "https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/vimdb/242133.jpg",
        },
        {
          meal_cname: "牛肉披薩",
          meal_name: "beefpizza",
          meal_price: 150,
          meal_image_url:
            "https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/vimdb/242141.jpg",
        },
        {
          meal_cname: "豬肉披薩",
          meal_name: "porkpizza",
          meal_price: 130,
          meal_image_url:
            "https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/vimdb/242133.jpg",
        },
      ],
    },
  },
  //服務生固定4人
  waiter: [
    {
      employee_id: "01",
    },
    {
      employee_id: "02",
    },
    {
      employee_id: "03",
    },
    {
      employee_id: "04",
    },
  ],
  selWaiter: null,
  //shoppingbasket作用在local所以不用放db
  //點菜確定後將資料insert到collections(order).doc(uuid)
  shoppingbasket: {
    meals: [],
  },
  //Format A
  /*{
    basket_number: uuid(2),
    desktop_name: 1,
    meals: [
      {
        meal_name: 'porkpizza',
        meal_qty: 1,
      },
      {
        meal_name: 'porkpizza',
        meal_qty: 2,
      },
    ],
    tot_amount: 390,
    waiter: '01',
  },*/
  desktop: [
    //因為單機固定九桌，這不放到db
    //Format A
    /*{
      desktop_name: 1,
      enabled: true,
      basket_number: uuid(2),
    },*/
    {
      desktop_name: 1,
      enabled: false,
      basket_number: null,
    },
    {
      desktop_name: 2,
      enabled: false,
      basket_number: null,
    },
    {
      desktop_name: 3,
      enabled: false,
      basket_number: null,
    },
    {
      desktop_name: 4,
      enabled: false,
      basket_number: null,
    },
    {
      desktop_name: 5,
      enabled: false,
      basket_number: null,
    },
    {
      desktop_name: 6,
      enabled: false,
      basket_number: null,
    },
    {
      desktop_name: 7,
      enabled: false,
      basket_number: null,
    },
    {
      desktop_name: 8,
      enabled: false,
      basket_number: null,
    },
    {
      desktop_name: 9,
      enabled: false,
      basket_number: null,
    },
    //Format B
    /*{
      desktop_name: 8,
      enabled: true,
      basket_number: uuid(1),
    },*/
  ],
  selDesktop: 0,
  //order這邊只是給local 暫存用的，資料從db來
  order: [
    //Format B
    /*{
      order_date: firebase.datetime,
      basket_number: uuid(1),
      desktop_name: 8,
      meals: [
        {
          meal_name: 'porkpizza',
          meal_qty: 1,
        },
        {
          meal_name: 'beefburg',
          meal_qty: 1,
        },
      ],
      tot_amount: 210,
      is_checkout: false,
      waiter: '01',
      question: [ //資料在結帳進填問卷畫面時，從db.collection(order).doc(uuid(1)).meals中產出
        {
          seq:1,
          content: {meal_name: 'porkpizza'},
          value: 0,
          pic_url: '',
          //ai 處理後寫的資料
          ai_value: 0,
          ai_data: {},
          ai_procdate: firebase.datetime
        },
        {
          seq:2,
          content: {meal_name: 'beefburg'},
          value: 0,
          pic_url: '',
          ai_value: 0,
          ai_data: {},
          ai_procdate: firebase.datetime
        },
        {
          seq:3,
          content: {waiter: '01'},
          value: 0,
          pic_url: '',
          ai_value: 0,
          ai_data: {},
          ai_procdate: firebase.datetime
        }
      ]
    }*/
  ],
  //question這邊只是給local 暫存用的，資料要進db
  //question list從order.doc(uuid(1)).question來當order.doc(uuid(1)).question
  //沒資料時從order.doc(uuid(1)).meals中產出
  //問卷填完後回寫db
  question: [
    //Format B
    /*{
      seq:1,
      content: {meal_name: 'porkpizza'},
      value: 0,
      pic_url: '',
    },
    {
      seq:2,
      content: {meal_name: 'beefburg'},
      value: 0,
      pic_url: '',
    },
    {
      seq:3,
      content: {waiter: '01'},//
      value: 0,
      pic_url: '',
    }*/
  ],
  meals: [],
};

const reducer = (state, action) => {
  //console.log(state.selDesktop)
  //console.log('redu')
  //console.log(action.payload)
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: { ...action.payload } };
    case "LOGOUT":
      return { ...state, currentUser: {} };
    case "FOOD_ADD_PRODUCT":
      return {
        ...state,
        shoppingbasket: {
          ...state.shoppingbasket,
          meals: [...state.shoppingbasket.meals, { ...action.payload }],
        },
      };
    case "FOOD_ADD_AMOUNT":
      return {
        ...state,
        shoppingbasket: { ...state.shoppingbasket, tot_amount: action.payload },
      };
    case "ORDER_ADD_ORDER":
      return { ...state, shoppingbasket: { meals: [] } };
    case "WAITER_SELECT":
      return { ...state, selWaiter: action.payload };
    case "DESKTOP_SELECT":
      return { ...state, selDesktop: action.payload };
    case "DESKTOP_ORDER": {
      state.desktop.map((d) => {
        if (d.desktop_name === state.selDesktop) {
          d.enabled = true;
          d.basket_number = action.payload;
        }
      });
      //return { ...state, desktop:[ ...state.desktop.filter(d=>d.desktop_name!=selDesktop), action.payload]}
      return { ...state, selDesktop: 0 };
    }
    case "DESKTOP_OVER_SEL":
      return { ...state, selDesktop: 0 };
    case "CHECKOUT_SEL_ORDER":
      return { ...state, order: [...action.payload] };
    case "CHECKOUT_A_ORDER": {
      state.desktop.map((d) => {
        if (d.desktop_name === state.selDesktop) {
          d.enabled = false;
          d.basket_number = false;
        }
      });
      return { ...state, selDesktop: 0, order: [] };
    }
    case "QUESTION_INIT":
      return { ...state, question: [...action.payload] };
    case "QUESTION_UPDATE": {
      state.question[action.payload.idx] = action.payload.data;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
