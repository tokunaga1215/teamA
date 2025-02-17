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
 
    // データが正しく取得されているか確認
    console.log('Date:', date);
    console.log('Temperature:', temperature);
    console.log('Sleep:', sleep);
    console.log('Mood:', mood);
 
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
 
function toggleNewEntryForm() {
    const form = document.getElementById('newEntryForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
 
function switchTab(tabName) {
    // タブボタンのアクティブ状態を更新
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.currentTarget.classList.add('active');
 
    // タブコンテンツの表示を切り替え
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabName}Tab`).classList.add('active');
}
 
function submitEntry(event) {
    event.preventDefault();
   
    // フォームデータの取得
    const data = {
        motivation: document.getElementById('motivationLevel').value,
        sleep: document.getElementById('sleepQuality').value,
        mood: document.getElementById('mood').value,
        energy: document.getElementById('energy').value,
        diary: document.getElementById('diaryEntry').value,
        reflection: document.getElementById('reflection').value,
        date: new Date().toLocaleDateString('ja-JP')
    };
 
    // ここでデータを保存したり処理したりする
    console.log('送信されたデータ:', data);
 
    // フォームを閉じる
    toggleNewEntryForm();
   
    // フォームをリセット
    event.target.reset();
}