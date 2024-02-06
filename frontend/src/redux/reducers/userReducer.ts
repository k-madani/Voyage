import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  token: string;
  type: string;
}

const initialState: User | null = {
  id:'',
  token:'',
  type:''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state : User | null, action: PayloadAction<User>) => {
      console.log("reached")
      return action.payload;
      console.log(state);
    },
    clearUser: (state) => {
      return {
        id: "",
        token: "",
        type:""
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
