import { createAction , createAsyncThunk} from '@reduxjs/toolkit';

export const getuser = createAction<string>('getuser');
export const getRoomDetail = createAction<{roomname:string,roomtype:boolean,roomid:string}>('getroomdetail');
/*
 * regenerator runtime not defined error  
export const createRoom = createAsyncThunk('createServerRoom',
		async(room:{roomname:string,roomtype:boolean} ,thunkAPI) =>{
				const response = await fetch('/api/chatroomcreate/',{
						method:'POST',
						body:JSON.stringify(room)
				})
				const data:{roomid:string,roomname:string,roomtype:boolean} = await response.json()
				return data;
		}
)
*/
