import { createAsyncThunk } from "@reduxjs/toolkit";

import { LoginSocialType, LoginType, RegisterType } from "../types/authType";

import { authAPI } from "../utils/api/authApi";
import { setItem } from "../utils/handlers/tokenHandler";

export const authActions = {
  login: createAsyncThunk(
    "auth/login",
    async (LoginData: LoginType, thunkAPI) => {
      try {
        const res = await authAPI.login(LoginData);
        setItem("user", res.data.token);
        return true;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  register: createAsyncThunk(
    "auth/register",
    async (newUser: RegisterType, thunkAPI) => {
      try {
        const res = await authAPI.register(newUser);
        setItem("user", res.data.token);
        return true;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  google: createAsyncThunk(
    "auth/google",
    async (user: LoginSocialType, thunkAPI) => {
      try {
        const res = await authAPI.google(user);
        setItem("user", res.data.token);
        return true;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  facebook: createAsyncThunk(
    "auth/facebook",
    async (user: LoginSocialType, thunkAPI) => {
      try {
        const res = await authAPI.facebook(user);
        setItem("user", res.data.token);
        return true;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  sms: createAsyncThunk("auth/login/sms", async (phone: string, thunkAPI) => {
    try {
      const res = await authAPI.loginWithSMS(phone);
      setItem("user", res.data.token);
      return true;
    } catch (error: any) {
      if (error.data) return thunkAPI.rejectWithValue(error.data);
      throw error;
    }
  }),

  resetPassword: createAsyncThunk<any, { email: string }>(
    "user/reset-password",
    async ({ email }, thunkAPI) => {
      try {
        const res = await authAPI.resetPassword({
          email,
        });
        return res.data;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),
};
