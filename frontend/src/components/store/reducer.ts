import { createReducer } from "@reduxjs/toolkit";
import { getuser, getRoomDetail, createRoom, joinRoom } from "./actions";

const initialState = {
  user: "",
  room: {
    roomid: "",
    roomname: "",
    roomtype: true,
  },
};
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      getuser,
      (state, action) =>
        (state = {
          ...state,
          user: action.payload,
        })
    )
    .addCase(joinRoom, (state, action) => ({
      ...state,
      room: {
        roomid: action.payload.roomid,
        roomname: action.payload.roomname,
        roomtype: action.payload.roomtype,
      },
    }))
    .addCase(createRoom.fulfilled, (state, action) => ({
      ...state,
      room: action.payload,
    }))
    .addCase(getRoomDetail, (state, action) => ({
      ...state,
      room: action.payload,
    }));
});
export default reducer;
