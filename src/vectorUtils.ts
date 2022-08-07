export class Vector2d {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    static fromCoordList(coords: number[]): Vector2d {
        return new Vector2d(coords[0], coords[1])
    }

    add(b: Vector2d): Vector2d {
        return new Vector2d(this.x + b.x, this.y + b.y)
    }

    mtpl(n: number): Vector2d {
        return new Vector2d(this.x * n, this.y * n)
    }

    subtract(b: Vector2d): Vector2d {
        return new Vector2d(this.x + b.x, this.y + b.y)
    }

    rotate(angle: number): Vector2d {
        return new Vector2d(
            this.x * Math.cos(angle) + this.y * Math.sin(angle),
            -this.x * Math.sin(angle) + this.y * Math.cos(angle)
        )
    }

    rotate90deg(): Vector2d {
        return new Vector2d(this.y, -this.x)
    }

    length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }


    toLength(length: number): Vector2d {
        const fact = length / this.length()
        return new Vector2d(this.x * fact, this.y * fact)

    }

}

export function draw(ctx: CanvasRenderingContext2D, start: Vector2d, end: Vector2d): void {
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
}


export class Line {
    start: Vector2d
    end: Vector2d
    vec: Vector2d

    constructor(start: Vector2d, end: Vector2d) {
        this.start = start
        this.end = end
        this.vec = new Vector2d(end.x - start.x, end.y - start.y)
    }

    static fromStartandVector(start: Vector2d, vec: Vector2d): Line {
        const end = start.add(vec)
        return new Line(start, end)
    }


    drawInCoord(ctx: CanvasRenderingContext2D, ex: Vector2d, ey: Vector2d, eoff: Vector2d): void {
        const newStart = ex.mtpl(this.start.x).add(ey.mtpl(this.start.y)).add(eoff)
        const newEnd = ex.mtpl(this.end.x).add(ey.mtpl(this.end.y)).add(eoff)
        draw(ctx, newStart, newEnd)
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath()
        ctx.lineWidth = 10
        draw(ctx, this.start, this.end)
        ctx.stroke()

    }


}
