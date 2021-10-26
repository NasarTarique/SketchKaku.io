import { createAction , createAsyncThunk} from '@reduxjs/toolkit';

export const getuser = createAction<string>('getuser');
export const getRoomDetail = createAction<{roomname:string,roomtype:boolean,roomid:string}>('getroomdetail');
export const createRoom = createAsyncThunk('createServerRoom',
		async(room:{roomname:string,roomtype:boolean} ,thunkAPI) =>{
				const response = await fetch('/api/chatroomcreate/',{
						method:'POST',
						headers:{
								'Content-Type':'application/json'
						},
						body:JSON.stringify(room)
				})
				const data:{roomid:string,roomname:string,roomtype:boolean} = await response.json()
				return data;
		}
)
