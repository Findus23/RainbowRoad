import "./style.scss"
import {Line, Vector2d} from "./vectorUtils";
import {
    drawZebraCrossing,
    nonbinaryZebraPattern,
    prideZebraPattern,
    transZebraPattern,
    zebraPattern
} from "./zebraUtils";


function main() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    ctx.lineWidth = 10;

    const start = new Vector2d(10, 110)
    const end = new Vector2d(110, 60)
    const line = new Line(start, end)
    const numLines = 10;
    drawZebraCrossing(ctx, new Line(start, new Vector2d(50, 50)), 30, zebraPattern, numLines)
    drawZebraCrossing(ctx, line, 30, prideZebraPattern, numLines)
    drawZebraCrossing(ctx, new Line(end, new Vector2d(160, 80)), 30, transZebraPattern, numLines)
    drawZebraCrossing(ctx, new Line(new Vector2d(160, 80), new Vector2d(120, 150)), 30, nonbinaryZebraPattern, numLines)
    // line.draw(ctx)
    // const line = new Line(start, end)
    //
    // line.draw(ctx)
    // normalline.draw(ctx)
}

main()
