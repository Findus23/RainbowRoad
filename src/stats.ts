import {AutoScaleAxis, BarChart, FixedScaleAxis, StepAxis} from "chartist";
import 'chartist/dist/index.css';
import {createElement} from "./domutils";
import data from "../stats.json"

export function addStatsChart(el: HTMLElement) {
    const chartEl = createElement("div")
    chartEl.id = "chart"
    el.appendChild(chartEl)
    new BarChart(
        chartEl,
        {
            labels: data.labels,
            series: [
                data.values,
            ]
        },
        {
            seriesBarDistance: 10,
            axisX:{
                // type: FixedScaleAxis,
                // divisor: 10,
                // labelInterpolationFnc: value =>
                //     new Date(value).toLocaleString(undefined, {
                //         month: 'short',
                //         year: 'numeric'
                //     })

            },
            axisY: {

                offset: 20,
            },

        }
    );
}
