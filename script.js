document.getElementById('health-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const temperature = document.getElementById('temperature').value;
    const sleep = document.getElementById('sleep').value;
    const mood = document.getElementById('mood').value;

    // ここでデータを保存するロジックを追加できます

    // グラフにデータを追加
    addTemperatureData(temperature);
});

const ctx = document.getElementById('temperatureChart').getContext('2d');
const temperatureChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '体温 (℃)',
            data: [],
            borderColor: '#1e90ff',
            backgroundColor: 'rgba(30, 144, 255, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: '時間'
                }
            },
            y: {
                title: {
                    display: true,
                    text: '体温 (℃)'
                },
                suggestedMin: 35,
                suggestedMax: 40
            }
        }
    }
});

function addTemperatureData(temperature) {
    const currentTime = new Date().toLocaleTimeString();
    temperatureChart.data.labels.push(currentTime);
    temperatureChart.data.datasets[0].data.push(temperature);
    temperatureChart.update();
}