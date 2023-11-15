import * as currencySymbols from "../currencySymbols.json";

export default function ChartCard (history, chartDiv) {
  const symbol = history.meta.symbol
  const currency = currencySymbols[history.meta.currency]
    ? currencySymbols[history.meta.currency].symbol : ''

  // Extract graphing data from history obj
  const dataPoints = Object.values(history.items).map(dataPoint => {
    const [ day, month, year ] = dataPoint.date.split("-")
    return {
      x: new Date(year, month-1, day),
      y: Number(dataPoint.close)
    }
  })

  const newChart = new CanvasJS.StockChart(chartDiv, {
    theme: "light1",
    height: 350,
    exportEnabled: true,
    backgroundColor: "#f7f7f7",
    subtitles: [{
      text: `${symbol} price history`,
      fontFamily: 'helvetica'
    }],
    charts: [{
      axisY: {
        prefix: currency,
        title: "Price"
      },
      data: [{
        type: "line",
        dataPoints
      }]
    }],
    navigator: {
      slider: {
        minimum: dataPoints[0].x,
        max: dataPoints[dataPoints.length-1].x
      }
    }
  })
  return newChart
}
