import { QueryParameter, DuneClient } from "@cowprotocol/ts-dune-client";
import { Chart, registerables,ChartItem  } from 'chart.js';
Chart.register(...registerables);
import { createCanvas } from 'canvas';
const fs = require("fs");

const { DUNE_API_KEY } = process.env;

const client = new DuneClient(DUNE_API_KEY ?? "");
const queryID = 4319;
const parameters = [
    //QueryParameter.enum("Platform", "All"),
    //QueryParameter.enum("Time", "1 Day"),
];

client
    .refresh(queryID)
    .then((executionResult) => {
        const data = executionResult.result?.rows;

        if (!data || data.length === 0) {
            console.log("No data returned from API");
            return;
        }

        const labels = data.map((item) => item.Project);
        const volumes = data.map((item) => item["24 Hours Volume"]);

        const canvas = createCanvas(800, 600);
        const ctx = canvas.getContext("2d") as unknown as ChartItem;


        const chart = new Chart(ctx, {
            type: "pie",
            data: {
                labels,
                datasets: [
                    {
                        label: "24 Hours Volume",
                        data: volumes,
                        backgroundColor: data.map((item) => getRandomColor()),
                    },
                ],
            },
        });

        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync("chart.png", buffer);
    });

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
