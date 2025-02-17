document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
});

document.getElementById('health-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const temperature = document.getElementById('temperature').value;
    const sleep = document.getElementById('sleep').value;
    const mood = document.getElementById('mood').value;

    // ここでデータを保存するロジックを追加できます

    // グラフにデータを追加
    addTemperatureData(date, temperature);
    addSleepData(date, sleep);
});

const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
const temperatureChart = new Chart(temperatureCtx, {
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
                    text: '日付'
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

const sleepCtx = document.getElementById('sleepChart').getContext('2d');
const sleepChart = new Chart(sleepCtx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '睡眠時間 (時間)',
            data: [],
            backgroundColor: 'rgba(30, 144, 255, 0.2)',
            borderColor: '#1e90ff',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: '日付'
                }
            },
            y: {
                title: {
                    display: true,
                    text: '睡眠時間 (時間)'
                },
                suggestedMin: 0,
                suggestedMax: 12
            }
        }
    }
});

function addTemperatureData(date, temperature) {
    temperatureChart.data.labels.push(date);
    temperatureChart.data.datasets[0].data.push(temperature);
    temperatureChart.update();
}

function addSleepData(date, sleep) {
    sleepChart.data.labels.push(date);
    sleepChart.data.datasets[0].data.push(sleep);
    sleepChart.update();
}