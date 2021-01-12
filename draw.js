export function rgb(color, opacity) {
    return '#' + color + pad(Math.round((opacity || 1) * 255).toString(16))
}

export function polygon(ctx, points) {
    ctx.beginPath()
    moveTo(ctx, points.get(-1))
    points.forEach(p => lineTo(ctx, p))
    ctx.stroke()
    ctx.fill()
}

export function line(ctx, a, b) {
    moveTo(ctx, a)
    lineTo(ctx, b)
    ctx.stroke()
}

export function dot(ctx, a, r) {
    ctx.beginPath()
    ctx.ellipse(a[0], a[1], r, r, 0, 0, Math.PI * 2)
    ctx.fill()
}

function pad(s) {
    return (s.length === 1 ? '0' : '') + s
}

function moveTo(ctx, a) {
    ctx.moveTo(a[0], a[1])
}

function lineTo(ctx, a) {
    ctx.lineTo(a[0], a[1])
}
