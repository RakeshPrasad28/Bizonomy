import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  institution: {
    name: "",
    teacherName: "",
    email: "",
    phone: "",
    selectedGames: [],
    gamesDetails: {},
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setInstitutionInfo(state, action) {
      state.institution = { ...state.institution, ...action.payload };
    },
    setSelectedGames(state, action) {
      state.institution.selectedGames = action.payload;
    },
    setGameDetails(state, action) {
      const { game, details } = action.payload;
      state.institution.gamesDetails[game] = details;
    },
    resetForm(state) {
      state.institution = {
        name: "",
        teacherName: "",
        email: "",
        phone: "",
        selectedGames: [],
        gamesDetails: {},
      };
    },
  },
});

export const { setInstitutionInfo, setSelectedGames, setGameDetails,resetForm } =
  formSlice.actions;
export default formSlice.reducer;
