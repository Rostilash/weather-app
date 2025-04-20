import { LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler, Chart as ChartJS } from "chart.js";

export const customIconsPlugin = (icons = []) => ({
  id: "customIcons",
  beforeDatasetsDraw(chart) {
    const { ctx } = chart;
    const dataset = chart.getDatasetMeta(0);
    dataset.data.forEach((point, index) => {
      ctx.save();
      ctx.font = "18px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(icons[index], point.x, point.y - 15);
      ctx.restore();
    });
  },
});

export const createChartData = (forecastData = []) => {
  const temps = forecastData.map((hour) => hour.temperature);
  const apparent = forecastData.map((hour) => hour.apparent_temperature);
  const icons = forecastData.map((hour) => hour.icon);
  const labels = forecastData.map((hour) => new Date(hour.time).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" }));

  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler, customIconsPlugin(icons));

  return {
    chartData: {
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temps,
          backgroundColor: "rgba(99, 58, 214, 0.2)",
          tension: 0.4,
          fill: true,
          pointRadius: 10,
          pointStyle: "circle",
          segment: {
            borderColor: (ctx) => {
              const temp = ctx.p0.parsed.y;
              if (temp > 35) return "red";
              if (temp > 18) return "orange";
              if (temp < 10) return "lightskyblue";
              return "white";
            },
          },
        },
        {
          label: "Feels like (°C)",
          data: apparent,
          borderColor: "rgba(255, 0, 0, 0.5)",
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#fff" },
          onClick: () => {},
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const index = context.dataIndex;
              const temp = context.dataset.data[index];
              const humidity = forecastData[index]?.humidity;
              const visibility = forecastData[index]?.visibility;
              return [`Temperature: ${temp}°C`, `Humidity: ${humidity}%`, `Visibility: ${visibility / 1000} км`];
            },
          },
        },
      },
      scales: {
        x: {
          ticks: { color: "#fff" },
          grid: { color: "rgba(255,255,255,0.2)" },
        },
        y: {
          ticks: { color: "#fff" },
          grid: { color: "rgba(255,255,255,0.2)" },
        },
      },
      animation: {
        tension: {
          duration: 1000,
          easing: "easeInOutQuart",
          from: 1,
          to: 0,
          loop: false,
        },
      },
    },
  };
};
