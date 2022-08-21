import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {SiteProcess} from '../../types/state';
import {setAvatarUrl,} from './../action';

const initialState: SiteProcess = {
  avatarUrl: null,
};

export const siteProcess = createSlice({
  name: NameSpace.Site,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setAvatarUrl, (state, action) => {
        state.avatarUrl = action.payload;
      });
  }
});
