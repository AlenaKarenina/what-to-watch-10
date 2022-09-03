import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {SiteProcess} from '../../types/state';

const initialState: SiteProcess = {
  avatarUrl: null,
};

export const siteProcess = createSlice({
  name: NameSpace.Site,
  initialState,
  reducers: {
    setAvatarUrl: (state, action) => {
      state.avatarUrl = action.payload;
    }
  }
});

export const {setAvatarUrl} = siteProcess.actions;
