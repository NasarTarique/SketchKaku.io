import { useEffect, useState } from "react";
import { RootState } from "./store/store";
import { connect, ConnectedProps } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { joinRoom } from "./store/actions";
import "./styles/room.css";

type RoomidParam = {
  rid: string;
};

const Room = (props: Propsfromredux) => {
  let { rid } = useParams<RoomidParam>();
  let history = useHistory();
  const [ws, setWebsocket] = useState<WebSocket | null>(null);
  const connect = () => {
    setWebsocket(
			new WebSocket("ws://localhost:8000/ws/room/" + props.room.roomid + "/")
    );
  };

  useEffect(() => {
    if (props.room.roomid.length === 0) {
      fetch("/api/roomalive/" + rid + "/")
        .then((response) => response.json())
        .then((data) => {
          const room: { roomid: string; roomname: string; roomtype: boolean } =
            {
              roomid: data.room_id,
              roomname: data.room_name,
              roomtype: data.public,
            };
          return room;
        })
        .then((room) => {
          props.joinRoom(room);
        })
        .catch(() => {
          history.push("/create");
        });
    } else connect();
  }, []);

  useEffect(() => {
    if (props.room.roomid.length === 0) history.push("/create");
  }, [props.room.roomid]);
  return (
    <div className="room-page">
      <h1 className="room-name">{rid}</h1>
      <textarea id="chatmessage" name="wschat" cols={30} rows={10}></textarea>
      <input type="text" />
      <input type="button" value="send" />
    </div>
  );
};

const mapState = (state: RootState) => ({
  room: state.room,
});

const mapDispatch = {
  joinRoom: (room: { roomname: string; roomtype: boolean; roomid: string }) =>
    joinRoom(room),
};
const connector = connect(mapState, mapDispatch);
type Propsfromredux = ConnectedProps<typeof connector>;

export default connector(Room);
