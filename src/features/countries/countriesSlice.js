import { createSlice } from "@reduxjs/toolkit";
import countriesAPI from "../../services/countries";

export const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        countries: [],
        isLoading: true,
    },
    reducers: {
        isLoading(state, action) {
            state.isLoading = action.payload;
        },
        getCountries(state, action) {
            state.countries = action.payload;
        }
    },

});

export const initializeCountries = () => {
    return async (dispatch) => {
        const countries = await countriesAPI.getAll();
        dispatch(getCountries(countries));
        setTimeout(() => dispatch(isLoading(false)), 1000)
    }
}

// The below line is connecting the reducer actions to the store.
export const { isLoading, getCountries } = countriesSlice.actions;

export default countriesSlice.reducer;