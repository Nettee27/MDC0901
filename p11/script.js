const labels = [];

for (let i = 6; i >= 0; i--) {
    labels.push(moment().subtract(i, "days").format("DD.MM"));
}

const sales = [12, 19, 15, 24, 18, 28, 22];

const chart = document.getElementById("salesChart");

new Chart(chart, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "Количество продаж",
            data: sales,
            borderColor: "#4b78d1",
            backgroundColor: "rgba(75, 120, 209, 0.2)",
            borderWidth: 2,
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
