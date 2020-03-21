import React, { createContext, useReducer, useContext } from "react";
import { REMOVE_EVENT, UPDATE_EVENTS, ADD_EVENT } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  console.log(state.events);

  switch (action.type) {
    case UPDATE_EVENTS:
      return {
        ...state,
        events: [...action.events]
      };

    case ADD_EVENT:
      return {
        ...state,
        events: [action.event, ...state.events]
      };

    case REMOVE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => {
          return event._id !== action._id;
        })
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    events: [],
    newEvent: {
      _id: 0,
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      address: "",
      venueName: "",
      type: ""
    }
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
