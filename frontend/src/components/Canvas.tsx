import {useRef, useEffect} from 'react';

const Canvas  = ()=>{
		const canvasRef = useRef<HTMLCanvasElement>(null)

		useEffect(()=>{
				const canvas = canvasRef.current
				if(canvas!=null){
				const context = canvas.getContext('2d')
						if(context!=null){
								context.fillStyle = "#ffffff";

						}

				}


		},[])

		return(
				<canvas ref={canvasRef}>
				</canvas>
		)
}

export default Canvas;
