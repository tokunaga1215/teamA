document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    displayLogs(); // 日誌の表示を初期化
});

document.getElementById('health-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const temperature = document.getElementById('temperature').value;
    const sleep = document.getElementById('sleep').value;
    const mood = document.getElementById('mood').value;

    // データが正しく取得されているか確認
    console.log('Date:', date);
    console.log('Temperature:', temperature);
    console.log('Sleep:', sleep);
    console.log('Mood:', mood);

    // グラフにデータを追加
    addTemperatureData(date, temperature);
    addSleepData(date, sleep);

    // 今日のモチベーションと睡眠の質を更新
    const moodValue = parseInt(mood, 10); // mood を数値に変換
    document.getElementById('todayMotivation').textContent = `${moodValue}/10`;
    document.getElementById('todaySleepQuality').textContent = `${sleep}/10`;

    // 平均モチベーションを更新
    updateAverageMotivation();
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

function updateAverageMotivation() {
    const moodValues = sleepChart.data.datasets[0].data;
    const total = moodValues.reduce((acc, val) => acc + parseFloat(val), 0);
    const average = (total / moodValues.length).toFixed(1);
    document.getElementById('averageMotivation').textContent = `${average}/10`;
}

function switchTab(event, tabName) {
    // タブボタンのアクティブ状態を更新
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // タブコンテンツの表示を切り替え
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// 日誌機能の追加
document.addEventListener('DOMContentLoaded', (event) => {
    displayLogs();
});

function saveLog() {
    const logEntry = document.getElementById('logEntry').value;
    if (logEntry.trim() === "") {
        alert("メモを入力してください。");
        return;
    }

    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    const log = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        entry: logEntry
    };
    logs.push(log);
    localStorage.setItem('logs', JSON.stringify(logs));
    document.getElementById('logEntry').value = "";
    displayLogs();
}

function deleteLog(id) {
    let logs = JSON.parse(localStorage.getItem('logs')) || [];
    logs = logs.filter(log => log.id !== id);
    localStorage.setItem('logs', JSON.stringify(logs));
    displayLogs();
}

function deleteAllLogs() {
    if (confirm("本当に全削除しますか？")) {
        localStorage.removeItem('logs');
        displayLogs();
    }
}

function displayLogs() {
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    const logEntriesDiv = document.getElementById('logEntries');
    logEntriesDiv.innerHTML = "";

    const groupedLogs = logs.reduce((acc, log) => {
        const [year, month] = log.date.split('/');
        const key = `${year}/${month}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(log);
        return acc;
    }, {});

    for (const [key, logs] of Object.entries(groupedLogs)) {
        const logGroupDiv = document.createElement('div');
        logGroupDiv.className = 'log-group';
        logGroupDiv.innerHTML = `<h3 onclick="toggleLogs('${key}')">${key}</h3>`;
        
        const logListDiv = document.createElement('div');
        logListDiv.className = 'log-list';
        logListDiv.style.display = 'none';
        logListDiv.id = `log-list-${key}`;

        logs.forEach(log => {
            const logDiv = document.createElement('div');
            logDiv.className = 'log-entry';
            logDiv.innerHTML = `
                <strong>${log.date}</strong><br>
                ${log.entry}<br>
                <button onclick="deleteLog(${log.id})">削除</button>
            `;
            logListDiv.appendChild(logDiv);
        });

        logGroupDiv.appendChild(logListDiv);
        logEntriesDiv.appendChild(logGroupDiv);
    }
}

function toggleLogs(key) {
    const logListDiv = document.getElementById(`log-list-${key}`);
    if (logListDiv.style.display === 'none') {
        logListDiv.style.display = 'block';
    } else {
        logListDiv.style.display = 'none';
    }
}

// 日誌タブに切り替える関数
function goToDiaryTab() {
    const diaryTabButton = document.querySelector('.tab-button[data-tab="diary"]');
    switchTab({ currentTarget: diaryTabButton }, 'diary');
}