import {dist, intersect, middle} from './math.js'
import {dot, line, polygon, rgb} from './draw.js'

const colors = ['ff0000', '00ff00', '0000ff']

window.pentagon = function (canvas) {
    const width = canvas.width
    const height = canvas.height
    let ctx = canvas.getContext('2d')

    let points = [rndCoord(), rndCoord(), rndCoord(), rndCoord(), rndCoord()]
    let drag = {point: null, drag: false}

    canvas.addEventListener('mousemove', e => {
        const c = [e.offsetX / canvas.offsetWidth * width, e.offsetY / canvas.offsetHeight * height]
        if (drag.drag) {
            points[drag.point] = c
            draw(ctx, points)
        } else {
            canvas.style.cursor = 'default'
            drag.point = null
            for (let i = 0; i < points.length; i++) {
                if (dist(c, points[i]) < 35) {
                    canvas.style.cursor = 'pointer'
                    drag.point = i
                    break
                }
            }
        }
    })
    canvas.addEventListener('mouseleave', e => {
        drag.drag = false
    })
    canvas.addEventListener('mousedown', e => {
        if (!drag.drag) {
            drag.drag = true
        }
    })
    canvas.addEventListener('mouseup', e => {
        drag.drag = false
    })

    let m = middle(points)
    points.sort((a, b) =>
        Math.atan2(m[0] - a[0], m[1] - a[1]) -
        Math.atan2(m[0] - b[0], m[1] - b[1])
    )
    draw(ctx, points, 5)

    function rndCoord() {
        return [Math.random() * width, Math.random() * height]
    }

    function draw(ctx, points) {
        ctx.clearRect(0, 0, width, height)
        doDraw(ctx, points, 5)
    }
}

function doDraw(ctx, points, level) {
    if (level > 0) {
        ctx.setLineDash([])
        let color = colors[level % colors.length]
        drawGon(ctx, points, color)

        ctx.setLineDash([5, 15])
        drawStar(ctx, points, color)
        let inner = points.map((p, i) =>
            intersect(points.get(i), points.get(i + 2), points.get(i + 1), points.get(i + 3)))

        doDraw(ctx, inner, level - 1)
    }
}


function drawGon(ctx, points, color) {
    ctx.strokeStyle = rgb(color)
    ctx.fillStyle = rgb(color, .05)
    polygon(ctx, points)
    ctx.fillStyle = rgb(color)
    points.forEach(p => dot(ctx, p, 5))
}

function drawStar(ctx, points, color) {
    ctx.strokeStyle = rgb(color)
    points.forEach((p, i) => line(ctx, points.get(i), points.get(i + 2)))

}

function drawStarFromGon(ctx, points) {
    let outer = points.map((p, i) => intersect(points.get(i), points.get(i + 1), points.get(i + 2), points.get(i + 3)))
    outer.forEach((p, i) => line(ctx, outer.get(i), outer.get(i + 1)))
}

