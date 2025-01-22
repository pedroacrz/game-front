import { useContext, useEffect, useRef } from 'react'
import './Game.css'
import Mentirinha from '../../assets/MENTIRINHA.png'
import { socketContext } from '../../contexts/SocketContext'

function Game() {
    const { game, actionPlay } = useContext(socketContext)

    const canvasRef = useRef<HTMLCanvasElement>(null)
    var image = new Image()
    image.src = Mentirinha

    let targetWidth = 50
    let targetHeigth = 50

    let canvaWidth = 700
    let canvaHeigth = 550

    useEffect(() => {
        Draw()
    }, [])

    useEffect(() => {
        Draw()
    }, [game])


    function Draw() {
        const canvas = canvasRef.current
        if (!canvas?.getContext) return
        canvas.addEventListener('mousedown', function (e) {
            getCursorPosition(canvas, e)
        })
        canvas.style.backgroundColor = 'black'
        canvas.style.cursor = 'crosshair'
        const ctx = canvas?.getContext('2d')
        if (!ctx) return

        ctx?.clearRect(0, 0, canvaWidth, canvaHeigth)
        ctx.fillRect(game.targetPosition.x, game.targetPosition.y, targetWidth, targetHeigth)
        ctx.fillStyle = 'white'
        ctx.drawImage(image, game.targetPosition.x, game.targetPosition.y, targetWidth, targetHeigth)


    }

    function getCursorPosition(canvas: HTMLCanvasElement, event: any) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        actionPlay({ x, y })
    }

    return (
        <>
            <canvas width={canvaWidth} height={canvaHeigth} ref={canvasRef}>
            </canvas>

        </>
    )
}

export default Game