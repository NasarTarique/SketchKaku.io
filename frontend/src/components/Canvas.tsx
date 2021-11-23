import { useRef, useEffect, Fragment } from "react";

type CanvasProps = {
  ws: WebSocket | undefined;
};



// TODO: HTMLCanvasElement.captureStream() 
const Canvas = (props: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let drawpath: number[] = [];
  let mouseonhold: boolean = false;
  let prevmouseposition: MouseEvent;
  let currmouseposition: MouseEvent;
  let backgroundfill = "#ffffff";
  let strokecolor = "#000000";
  let count = 0;

  const backgroundstyle = (color: string): void => {
    const canvas = canvasRef.current;
    if (canvas != null) {
      backgroundfill = color;
      canvas.style.backgroundColor = color;
    }
  };

  const strokestyle = (color: string): void => {
    const context = canvasRef.current?.getContext("2d");
    if (context != null) {
      strokecolor = color;
      context.strokeStyle = color;
    }
  };

  const clearboard = (): void => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context != null && canvas != null) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const draw = (px: number, py: number, cx: number, cy: number): void => {
    const context = canvasRef.current?.getContext("2d");
    const client = canvasRef.current?.getBoundingClientRect();
    if (context != null && client != null) {
      context.beginPath();
      context.moveTo(px - client.x, py - client.y);
      context.lineTo(cx - client.x, cy - client.y);
      context.lineWidth = 5;
      context.stroke();
      context.closePath();
    }
  };

  const intervalfunction = (): void => {
    let setIntervalID = setInterval(() => {
      if (!mouseonhold) clearInterval(setIntervalID);
      else {
        let px = prevmouseposition.clientX;
        let py = prevmouseposition.clientY;
        let cx = currmouseposition.clientX;
        let cy = currmouseposition.clientY;
        draw(px, py, cx, cy);
      }
    }, 0.5);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (props.ws != undefined) {
      console.log("Not undefined");
      props.ws.onmessage = (ev) => {
        console.log("message received canvas");
        let data = JSON.parse(ev.data);
        let arr: number[] = data.drawpath;
        if (canvas != null && context != null) {
          canvas.style.backgroundColor = data.backgroundfill;
          context.strokeStyle = data.strokecolor;
        }
		draw(arr[0],arr[1],arr[2],arr[3]);
               };
    }
    if (canvas != null) {
      canvas.style.backgroundColor = "#ffffff";
      canvas.onmousedown = (ev) => {
        prevmouseposition = ev;
        currmouseposition = ev;
        mouseonhold = true;
        intervalfunction();
      };

      canvas.onmouseup = (ev) => {
        mouseonhold = false;
        intervalfunction();
      };

      canvas.onmouseleave = (ev) => {
        mouseonhold = false;
        intervalfunction();
      };

      canvas.onmousemove = (ev) => {
        prevmouseposition = currmouseposition;
        currmouseposition = ev;
        intervalfunction();
      };
    }
  }, []);

  return (
    <Fragment>
      <canvas ref={canvasRef} width="300" height="300"></canvas>
      <div className="strokecolor-buttons"></div>
      <div className="backgroundfill-buttons"></div>
    </Fragment>
  );
};

export default Canvas;
