import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  POST_SUB_CATEGORY,
  SET_COLORS,
  SET_SUB_CATEGORY,
} from "../../actions/Category.Actions";
import { API } from "../../constants/baseUrl";
import CategoryReducer from "../../reducers/CategoryReducer";

const CategoryContext = createContext({});

const initialState = {
  isLoading: false,
  subCategories: [],
  colors: [],
};

export const CategoryContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CategoryReducer, initialState);

  const fetchSubCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/subcategory`);
      dispatch({ type: SET_SUB_CATEGORY, payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleCreateSubCategory = async (subCategory: any) => {
    try {
      console.log("created", subCategory);
      const { data } = await axios.post(`${API}/subcategory`, {
        ...subCategory,
      });
      if (data) {
        await fetchSubCategory();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleUpdateSubCategory = async (id: number, value: any) => {
    try {
      const { data } = await axios.patch(`${API}/subcategory/${id}`, {
        ...value,
      });
      if (data?.affected) {
        await fetchSubCategory();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteSubCategory = async (id: number) => {
    try {
      const { data } = await axios.delete(`${API}/subcategory/${id}`);
      if (data?.affected) {
        await fetchSubCategory();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchColors = async () => {
    try {
      const { data } = await axios.get(`${API}/colors`);
      dispatch({ type: SET_COLORS, payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleCreateColor = async (value: any) => {
    try {
      const { data } = await axios.post(`${API}/colors`, value);
      if (data) {
        await fetchColors();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleUpdateColor = async (id: number, value: any) => {
    try {
      const { data } = await axios.patch(`${API}/colors/${id}`, value);
      if (data?.affected) {
        await fetchColors();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteColor = async (id: number) => {
    try {
      const { data } = await axios.delete(`${API}/${id}`);
      if (data?.affected) {
        await fetchColors();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchSubCategory();
    fetchColors();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        ...state,
        handleCreateSubCategory,
        handleDeleteSubCategory,
        handleUpdateSubCategory,
        handleCreateColor,
        handleUpdateColor,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  return useContext(CategoryContext);
};
