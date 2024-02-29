import { createSlice } from "@reduxjs/toolkit";
import { Key } from "react";

interface IPortalKey{
    PORTAL_KEY_DO_NOT_CHANGE: Key
};

const initialState : IPortalKey = {
    PORTAL_KEY_DO_NOT_CHANGE: 'PORTAL_KEY_s?3CmcW6RJ1Fqd9=N0sDHieoQPih',
};

const portalKeySlice = createSlice({
    name: 'portalKey',
    initialState,
    reducers : {}
})

export default portalKeySlice.reducer