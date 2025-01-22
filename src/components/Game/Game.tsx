import { useEffect, useRef } from 'react'
import './Game.css'

function Game() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas == null) return;
        canvas.style.backgroundColor = 'black'
        const context = canvas.getContext("2d");
        if (context == null) return;
        context.fillStyle = "white";
        context.fillRect(650, 460, 50, 40);
    }, []);

    return (
        <canvas width={700} height={500} ref={canvasRef}></canvas>
    )
}

export default Game