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