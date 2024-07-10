document.addEventListener('DOMContentLoaded', function() {
    const userDropdown = document.getElementById('userDropdown');
    const dashboard = document.getElementById('dashboard');
    const lastUpdated = document.getElementById('lastUpdated');

    // ダミーユーザーリスト
    const dummyUsers = [
        { id: 1, name: "鈴木 花子" },
        { id: 2, name: "佐藤 明美" },
        { id: 3, name: "田中 優子" },
        { id: 4, name: "高橋 真理" },
        { id: 5, name: "渡辺 恵子" }
    ];

    // ユーザーリストをドロップダウンに追加
    function populateUserDropdown() {
        dummyUsers.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            userDropdown.appendChild(option);
        });
    }

    // ページ読み込み時にユーザーリストを表示
    populateUserDropdown();

    // ユーザー選択時の処理
    userDropdown.addEventListener('change', function() {
        if (this.value) {
            dashboard.classList.remove('hidden');
            loadDashboardData(this.value);
        } else {
            dashboard.classList.add('hidden');
        }
    });

    // チャートの初期化
    let heartRateChart, activityChart, sleepChart, stepsChart;

    // ダッシュボードデータの読み込み（ダミーデータを使用）
    function loadDashboardData(userId) {
        // ダミーデータ
        const dummyData = {
            heartRate: [60, 65, 70, 68, 72, 75, 70],
            activity: [30, 45, 60, 40, 50, 55, 65],
            sleep: [7, 6.5, 8, 7.5, 6, 7, 7.5],
            steps: [8000, 10000, 9000, 11000, 7500, 9500, 10500]
        };

        updateChart('heartRateChart', heartRateChart, 'line', '心拍数', dummyData.heartRate);
        updateChart('activityChart', activityChart, 'bar', '活動時間（分）', dummyData.activity);
        updateChart('sleepChart', sleepChart, 'bar', '睡眠時間（時間）', dummyData.sleep);
        updateChart('stepsChart', stepsChart, 'line', '歩数', dummyData.steps);

        lastUpdated.textContent = new Date().toLocaleString();
    }

    function updateChart(canvasId, chartInstance, type, label, data) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        // グラフタイプに応じたオプションを設定
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        };
    
        // グラフごとの個別設定
        switch(canvasId) {
            case 'heartRateChart':
                options.scales.y.max = Math.max(...data) + 10;
                options.scales.y.title = { display: true, text: '心拍数 (bpm)' };
                break;
            case 'activityChart':
                options.scales.y.max = Math.max(...data) + 15;
                options.scales.y.title = { display: true, text: '活動時間 (分)' };
                break;
            case 'sleepChart':
                options.scales.y.max = 12;  // 最大12時間とする
                options.scales.y.title = { display: true, text: '睡眠時間 (時間)' };
                break;
            case 'stepsChart':
                options.scales.y.max = Math.max(...data) * 1.1;  // 最大値の110%
                options.scales.y.title = { display: true, text: '歩数' };
                break;
        }
    
        const chartData = {
            labels: ['月', '火', '水', '木', '金', '土', '日'],
            datasets: [{
                label: label,
                data: data,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }]
        };
    
        if (chartInstance) {
            chartInstance.data = chartData;
            chartInstance.options = options;
            chartInstance.update();
        } else {
            chartInstance = new Chart(ctx, {
                type: type,
                data: chartData,
                options: options
            });
        }
    
        // グローバル変数を更新
        switch(canvasId) {
            case 'heartRateChart': heartRateChart = chartInstance; break;
            case 'activityChart': activityChart = chartInstance; break;
            case 'sleepChart': sleepChart = chartInstance; break;
            case 'stepsChart': stepsChart = chartInstance; break;
        }
    }

        // グローバル変数を更新
        switch(canvasId) {
            case 'heartRateChart': heartRateChart = chartInstance; break;
            case 'activityChart': activityChart = chartInstance; break;
            case 'sleepChart': sleepChart = chartInstance; break;
            case 'stepsChart': stepsChart = chartInstance; break;
        }
    }
);