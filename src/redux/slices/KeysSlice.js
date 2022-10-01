import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}` ,   'Content-Type': 'application/json'  }

export const fetchkeyAction = createAsyncThunk(
  "keys/list",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api-optimum.seedogh.com/api/keys/all` 
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue("Error Fetching Data");
    }
  }
);

export const fetchSinglekey = createAsyncThunk(
  "single/key",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api-optimum.seedogh.com/api/keys/${payload}`
        
      );

      return data.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchsinglePendingkey = createAsyncThunk(
  "single/pendingkey",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api-optimum.seedogh.com/api/keys/pending/${payload}`
        
      );

      return data.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchPendingkey = createAsyncThunk(
  "pending/key",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api-optimum.seedogh.com/api/keys/pending` 
        
      );

      return data.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchinstitutionkey = createAsyncThunk(
  "institution/key",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api-optimum.seedogh.com/api/keys/all/${payload}` 
        
      );

      return data.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPendingkey = createAsyncThunk(
  "pending/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/keys/pending`,payload 
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createnewkey = createAsyncThunk(
  "newkey/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/keys/`,payload 
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createnewkey1 = createAsyncThunk(
  "newkey1/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/keys`,payload 
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const revokekey = createAsyncThunk(
  "revoke/key",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `https://api-optimum.seedogh.com/api/keys/${payload}` 
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletesinglePendingkey = createAsyncThunk(
  "delete/key",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/keys/delete/${payload}`
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fakeloginUserAction = createAsyncThunk(
  "fake/user",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com`
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);


const keysSlices = createSlice({
  name: "mykeys",
  initialState: {},
  extraReducers: builder => {
    builder.addCase(fetchkeyAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchkeyAction.fulfilled, (state, action) => {
      state.keysList = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchkeyAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.keysList = undefined;
    });




    builder.addCase(fetchSinglekey.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSinglekey.fulfilled, (state, action) => {
      state.Singlekey = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchSinglekey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.Singlekey = undefined;
    });

    
    builder.addCase(fetchPendingkey.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPendingkey.fulfilled, (state, action) => {
      state.Pendingkey = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchPendingkey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.Pendingkey = undefined;
    });

    builder.addCase(fetchinstitutionkey.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchinstitutionkey.fulfilled, (state, action) => {
      state.institutionkey = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchinstitutionkey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.institutionkey= undefined;
    });


    ////fake
    builder.addCase(fakeloginUserAction.pending, (state, action) => {
      state.loading = true;
      state.newkey = undefined;
      state.revokes = undefined;
  
     
    });


    builder.addCase(createPendingkey.pending, (state, action) => {
      state.loading = true;
      state.createPending= undefined;
    });
    builder.addCase(createPendingkey.fulfilled, (state, action) => {
      state.createPending= action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(createPendingkey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.createPending= undefined;
    });

    builder.addCase(revokekey.pending, (state, action) => {
      state.loading = true;
      state.revokes= undefined;
    });
    builder.addCase(revokekey.fulfilled, (state, action) => {
      state.revokes = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(revokekey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.revokes= undefined;
    });

    builder.addCase(fetchsinglePendingkey.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchsinglePendingkey.fulfilled, (state, action) => {
      state.singlePendingkey = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchsinglePendingkey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.singlePendingkey= undefined;
    });

    
    builder.addCase(createnewkey.pending, (state, action) => {
      state.loading = true;
      state.newkey= undefined;
    });
    builder.addCase(createnewkey.fulfilled, (state, action) => {
      state.newkey = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(createnewkey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.newkey= undefined;
    });

    builder.addCase(createnewkey1.pending, (state, action) => {
      state.loading = true;
      state.newkey1= undefined;
    });
    builder.addCase(createnewkey1.fulfilled, (state, action) => {
      state.newkey1 = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(createnewkey1.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.newkey1= undefined;
    });


       
    builder.addCase(deletesinglePendingkey.pending, (state, action) => {
      state.loading = true;
      state.deletesingle= undefined;
    });
    builder.addCase(deletesinglePendingkey.fulfilled, (state, action) => {
      state.deletesingle = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(deletesinglePendingkey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.deletesingle= undefined;
    });

  },
});

export default keysSlices.reducer;


