Array.prototype.get = function (i) {
    return this[(this.length + i) % this.length]
}

export function dist(a, b) {
    return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])
}

export function middle(points) {
    const sum = points.reduce((acc, p) => {
        acc[0] += p[0]
        acc[1] += p[1]
        return acc
    }, [0, 0])
    return [sum[0] / points.length, sum[1] / points.length]
}

export function intersect(a, b, c, d) {
    let s1 = (a[1] - b[1]) / (a[0] - b[0])
    let s2 = (c[1] - d[1]) / (c[0] - d[0])
    let t1 = a[1] - s1 * a[0]
    let t2 = c[1] - s2 * c[0]
    let x = (t2 - t1) / (s1 - s2)
    return [x, s1 * x + t1]
}

