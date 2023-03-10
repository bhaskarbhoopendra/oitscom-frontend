import {
  POST_SUB_CATEGORY,
  SET_COLORS,
  SET_SUB_CATEGORY,
} from "../actions/Category.Actions";

const CategoryReducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_SUB_CATEGORY:
      return { ...state, subCategories: action.payload };
    case POST_SUB_CATEGORY:
      return {
        ...state,
        subCategories: [...state.subCategories, action.payload],
      };
    case SET_COLORS:
      return { ...state, colors: action.payload };
    default:
      return "Nothing found";
  }
};

export default CategoryReducer;
