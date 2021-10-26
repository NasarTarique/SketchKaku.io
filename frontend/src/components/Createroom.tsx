import "./styles/createroom.css";
import { RootState } from "./store/store";
import { connect, ConnectedProps } from "react-redux";
import { getRoomDetail } from "./store/actions";

const Createroom = (props: Propsfromredux) => {
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
		/*  createRoom: (room: { roomname: string; roomid: string; roomtype: boolean }) =>
	createRoom(room),*/
};
const connector = connect(mapState, mapDispatch);
type Propsfromredux = ConnectedProps<typeof connector>;
export default connector(Createroom);
