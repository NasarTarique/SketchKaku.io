import {PayloadAction} from '@reduxjs/toolkit';
interface User{
		name:string
}
const initialState:User = {
		name:''
}
const reducer = (state=initialState,action:PayloadAction<string>) =>{
		switch(action.type){
				case 'username_change':
						return (
								{
										...state,
										name:action.payload
								}
						)
		}
}

export default reducer;
