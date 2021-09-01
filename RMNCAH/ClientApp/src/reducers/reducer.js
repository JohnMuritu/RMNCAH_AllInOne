import * as ACTION_TYPES from '../actions/actions';

const jwt = require('jsonwebtoken');

const initialState = {
  userToken: null,
  user: {},
  authenticated: false,
  clientDetails: {
    clientId: '',
    chvId: '',
    chv: null,
    deptClientId: '',
    fullNames: '',
    dob: null,
    village: '',
    phoneNumber: '',
    alternativePhoneNumber: '',
    // hfLinked: {
    //   mflCode: '',
    //   facilityName: ''
    // },
    mfl_code: null,
    hfLinked: null,
    otherHFAttended: '',
    hivStatusKnown: '',
    testDone: ''
  },
  clientClinicalDetails: {
    clientClinicalDetailsId: '',
    clientId: '',
    babyName: '',
    anc1: null,
    anc2: null,
    anc3: null,
    anc4: null,
    anc5: null,
    edd: null,
    remarksParent: null,
    delivery: null,
    penta1: null,
    penta2: null,
    penta3: null,
    mr1: null,
    remarksChild: null
  },
  userDetails: {
    userId: '',
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    userRole: 'USER',
    password: '',
    confirmPassword: ''
  },
  chvDetails: {
    chv_id: 0,
    chv_name: '',
    active: '1'
  },
  update_client_list: 0,
  client_list: [],
  update_component: 0,
  dateFrom: null,
  dateTo: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTHENTICATION:
      return {
        ...state,
        userToken: action.payload,
        user: jwt.decode(action.payload),
        authenticated: true
      };

    case ACTION_TYPES.SET_CLIENT_DETAILS:
      return { ...state, clientDetails: action.payload };

    case ACTION_TYPES.SET_CLIENT_CLINICAL_DETAILS:
      return { ...state, clientClinicalDetails: action.payload };

    case ACTION_TYPES.SET_USER_DETAILS:
      return { ...state, userDetails: action.payload };

    case ACTION_TYPES.SET_CHV_DETAILS:
      return { ...state, chvDetails: action.payload };

    case ACTION_TYPES.UPDATE_CLIENT_LIST:
      return { ...state, update_client_list: action.payload };

    case ACTION_TYPES.CLIENT_LIST:
      return { ...state, client_list: action.payload };

    case ACTION_TYPES.UPDATE_COMPONENT:
      return { ...state, update_component: Math.random() };

    case ACTION_TYPES.DATE_FROM:
      return { ...state, dateFrom: action.payload };

    case ACTION_TYPES.DATE_TO:
      return { ...state, dateTo: action.payload };

    case ACTION_TYPES.LOG_OUT:
      return initialState;

    default:
      return state;
  }
};
export default reducer;
