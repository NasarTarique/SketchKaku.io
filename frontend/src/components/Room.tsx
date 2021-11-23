import { useEffect, useState, useRef } from "react";
import { RootState } from "./store/store";
import { connect, ConnectedProps } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { joinRoom } from "./store/actions";
import Canvas from "./Canvas"
import "./styles/room.css";

type RoomidParam = {
  rid: string;
};

const Room = (props: Propsfromredux) => {

  // States and References
  const [msg, getMsg] = useState("");
  const wssocket = useRef<WebSocket>();
  const [connected, setConnnected] = useState(false)
  const chatRef = useRef<HTMLTextAreaElement>(null);
  let { rid } = useParams<RoomidParam>();
  let history = useHistory();

  const addMessage = (msg: string): void => {
    if (chatRef.current != undefined) {
      chatRef.current.value += ">>> " + msg + "\n";
    }
  };

  const connect = (): void => {
    if (wssocket.current != undefined) return;
    const sockt = new WebSocket(
      "ws://localhost:8080/ws/room/" + props.room.roomid + "/"
    );
		  console.log("connecting");
		  console.log(sockt);
    sockt.onopen = (e) => {
      console.log("connection open");
      wssocket.current = sockt; 
      setConnnected(true)
      wssocket.current.onmessage = (e) => {
        console.log("message received");
        let data = JSON.parse(e.data);
        addMessage(data.message);
        console.log(data.message);
      };
    };
  };

		const showCanvas = ()=>{
				if(connected){
							  return <Canvas ws={wssocket.current}/>
				}
		}
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
      <div className="room-user">
        <div className="user-container"></div>
      </div>
      <div className="room-canvas">
			  {showCanvas()}
      </div>

      <div className="room-chat">
        <textarea
          id="chatmessage"
          name="wschat"
          cols={30}
          rows={10}
          readOnly
          ref={chatRef}
        ></textarea>
        <input
          type="text"
          value={msg}
          onChange={(e) => getMsg(e.target.value)}
        />
        <input
          type="button"
          value="send"
          onClick={(e) => {
            console.log("clicked");
            if (wssocket.current != undefined) {
              wssocket.current.send(
                JSON.stringify({
                  'message': msg,
				  'drawpath':[],
				  'backgroundfill':"#ffffff",
				  'strokecolor':"#000000"
                })
              );
              getMsg("");
            }
          }}
        />
      </div>

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
