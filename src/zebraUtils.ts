import {Line, Vector2d} from "./vectorUtils";
import {FlagType} from "../interfaces";

export const prideFlagColors = ["#e40303", "#ff8c00", "#ffed00", "#008026", "#004dff", "#750787"]
export const transFlagColors = ["#5BCEFA", "#F5A9B8"]
export const nonbinaryFlagColors = ["#FFF433", "#9B59D0", "#2D2D2D"] // I assume they will skip the white stripe
export type PatternFunction = (i: number) => string

export function zebraPattern(i: number): string {
    return i % 2 == 0 ? "white" : "black";
}

export function generateFlagZebraPattern(colors: string[]): PatternFunction {
    return (i: number): string => {
        if (i % 2) {
            return "white"
        } else {
            const j = Math.floor(i / 2) % colors.length
            return colors[j]
        }
    };
}

export const prideZebraPattern = generateFlagZebraPattern(prideFlagColors)
export const transZebraPattern = generateFlagZebraPattern(transFlagColors)
export const nonbinaryZebraPattern = generateFlagZebraPattern(nonbinaryFlagColors)

export const zebraPatterns: { [d in FlagType]: PatternFunction } = {
    "prideFlag": prideZebraPattern,
    "transFlag": transZebraPattern,
    "nonbinaryFlag": nonbinaryZebraPattern
}


export function drawZebraCrossing(
    ctx: CanvasRenderingContext2D,
    line: Line,
    zebraWidth: number,
    pattern: (i: number) => string, numStripes?: number
): void {
    const ex = line.vec
    const ey = line.vec.rotate90deg().toLength(zebraWidth)
    const eoff = line.start
// console.log(line.length())
// console.log(line.vec)
    if (typeof numStripes === "undefined") {
        numStripes = Math.floor(line.vec.length() / 6)
    }
    // console.log(numStripes)

    const stripeLength = 1
    const stripeWidth = stripeLength / numStripes
    for (let i = 0; i < numStripes; i++) {
        const x = i * stripeWidth
        ctx.beginPath()
        ctx.lineWidth = stripeWidth * ex.length()
        ctx.strokeStyle = pattern(i)
        const stripe = new Line(new Vector2d(x, -0.5), new Vector2d(x, 0.5))
        stripe.drawInCoord(ctx, ex, ey, eoff)
        ctx.stroke()
    }

}
