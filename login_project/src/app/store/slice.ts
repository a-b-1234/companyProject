import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContainerState } from "./types";


export const initialState: ContainerState = {
    personalDetails: {
        name: "",
        Team: "",
        joinedAt: new Date(),
        avatar: ""
    }
};

const appSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setPersonalDetails(state, action: PayloadAction<PersonalDetails>) {
            state.personalDetails = action.payload
        }
    },
});

export const { actions, reducer, name: sliceKey } = appSlice;
