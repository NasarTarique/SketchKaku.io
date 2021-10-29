import "./styles/createroom.css";
import {useEffect} from 'react';
import { RootState } from "./store/store";
import { connect, ConnectedProps } from "react-redux";
import { getRoomDetail, createRoom } from "./store/actions";
import {useHistory} from 'react-router-dom';

const Createroom = (props: Propsfromredux) => {
		let history = useHistory();
		useEffect(()=>{
				if(props.room.roomid.length>0){
						history.push('/room/'+props.room.roomid)
				}
		},[props.room.roomid])
  return (
    <div className="create-room-page">
      <div className="room-name-input">
        <input
          type="text"
          placeholder="Room Name"
          value={props.room.roomname}
          onChange={(e) =>
            props.getRoomDetail({ ...props.room, roomname: e.target.value })
          }
        ></input>
      </div>
      <div className="room-type-input">
        <div>
          <input
            id="public-radio-input"
            type="radio"
            name="RoomType"
            value="public"
            onClick={(e) => {
              props.getRoomDetail({ ...props.room, roomtype: true });
            }}
          ></input>
          <label htmlFor="Public"> Public</label>
        </div>
        <div>
          <input
            id="private-radio-input"
            type="radio"
            name="RoomType"
            value="private"
            onClick={(e) => {
              props.getRoomDetail({ ...props.room, roomtype: false });
            }}
          ></input>
          <label htmlFor="Private"> Private</label>
        </div>
      </div>
      <div className="create-room-button">
        <p
          onClick={(e) => {
            console.log(props.room);
            props.createRoom({
              roomname: props.room.roomname,
              roomtype: props.room.roomtype,
            });
          }}
        >
          CREATE
        </p>
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  room: state.room,
});

const mapDispatch = {
  getRoomDetail: (room: {
    roomname: string;
    roomtype: boolean;
    roomid: string;
  }) => getRoomDetail(room),
  createRoom: (room: { roomname: string; roomtype: boolean }) =>
    createRoom(room),
};
const connector = connect(mapState, mapDispatch);
type Propsfromredux = ConnectedProps<typeof connector>;
export default connector(Createroom);
