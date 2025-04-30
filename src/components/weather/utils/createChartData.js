import { LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler, Chart as ChartJS } from "chart.js";

export const customIconsPlugin = (icons = []) => {
  const images = [];
  const imagePromises = [];

  // Preload image
  icons.forEach((icon, index) => {
    if (icon.startsWith("http")) {
      // If the icon is a URL
      const img = new Image();
      img.src = icon;

      // Save the image and add a Promise to check the download
      images[index] = img;
      const loadPromise = new Promise((resolve, reject) => {
        img.onload = () => resolve(img); // When the image is loaded
        img.onerror = (err) => reject(err); //If the image doesn't load
      });
      imagePromises.push(loadPromise);
    } else {
      // If it's a regular emoji
      images[index] = icon; // Keeping emojis as is
    }
  });

  return {
    id: "customIcons",
    beforeDatasetsDraw(chart) {
      const { ctx } = chart;
      const dataset = chart.getDatasetMeta(0);

      // We are waiting for all the images to load.
      Promise.all(imagePromises)
        .then(() => {
          dataset.data.forEach((point, index) => {
            const icon = images[index];
            const isSmallScreen = window.innerWidth < 800;
            const size = isSmallScreen ? 16 : 32;

            ctx.save();
            if (typeof icon === "string") {
              // If it's an emoji, draw it
              ctx.font = "18px sans-serif";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(icon, point.x, point.y - size - 10);
            } else {
              // If it's an image, draw it
              ctx.drawImage(icon, point.x - size / 2, point.y - size - 10, size, size);
            }
            ctx.restore();
          });
        })
        .catch((error) => {
          console.error("Failed to load all images", error);
        });
    },
  };
};

export const createChartData = (forecastData = []) => {
  const temps = forecastData.map((hour) => hour.temperature);
  const apparent = forecastData.map((hour) => hour.apparent_temperature);
  const icons = forecastData.map((hour) => hour.icon);
  const labels = forecastData.map((hour) => {
    const date = new Date(hour.time);
    const hour12 = date.toLocaleString("en-US", { hour: "numeric", hour12: true });
    return hour12;
  });

  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);
  const isSmallScreen = window.innerWidth < 800;
  const pointRadius = isSmallScreen ? 3 : 6;
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
          pointRadius: pointRadius,
          pointStyle: "circle",
          pointBackgroundColor: "#f2f2f2",
          pointBorderColor: "blue",
          segment: {
            borderColor: (ctx) => {
              const temp = ctx.p0.parsed.y;
              if (temp > 34) return "red";
              if (temp > 24) return "orange";
              if (temp > 14) return "yellow";
              if (temp <= 14) return "lightskyblue";
              if (temp < 0) return "blue";
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
          grid: { color: "rgba(255,255,255,0.1)" },
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
    customPlugins: [customIconsPlugin(icons)],
  };
};
