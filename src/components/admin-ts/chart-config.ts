export const getBarChartData = () => ({
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
    datasets: [
        {
            label: "Doanh thu (triệu)",
            data: [35, 15, 55, 35, 45, 25, 30],
            backgroundColor: "rgba(34, 197, 94, 0.8)",
            borderRadius: 6,
            hoverBackgroundColor: "rgba(34, 197, 94, 1)",
        },
    ],
})

export const getPieChartData = () => ({
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
    datasets: [
        {
            data: [25, 15, 12, 8, 18, 12, 10],
            backgroundColor: [
                "rgba(99, 102, 241, 0.8)",
                "rgba(251, 191, 36, 0.8)",
                "rgba(234, 88, 12, 0.8)",
                "rgba(6, 182, 212, 0.8)",
                "rgba(219, 39, 119, 0.8)",
                "rgba(132, 204, 22, 0.8)",
                "rgba(124, 58, 237, 0.8)",
            ],
            hoverBackgroundColor: [
                "rgba(99, 102, 241, 1)",
                "rgba(251, 191, 36, 1)",
                "rgba(234, 88, 12, 1)",
                "rgba(6, 182, 212, 1)",
                "rgba(219, 39, 119, 1)",
                "rgba(132, 204, 22, 1)",
                "rgba(124, 58, 237, 1)",
            ],
            borderWidth: 0,
        },
    ],
})

export const getLineChartData = () => ({
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
        {
            label: "Năm nay",
            data: [30, 40, 35, 50, 49, 60, 70, 91, 86, 95, 90, 100],
            borderColor: "rgba(34, 197, 94, 1)",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            tension: 0.3,
            fill: true,
        },
        {
            label: "Năm trước",
            data: [20, 25, 30, 35, 40, 45, 55, 65, 70, 80, 75, 85],
            borderColor: "rgba(99, 102, 241, 1)",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            tension: 0.3,
            fill: true,
        },
    ],
})

export const getChartOptions = (theme: string | undefined) => ({
    bar: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 12,
                titleFont: { size: 14 },
                bodyFont: { size: 13 },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                },
                ticks: {
                    font: { size: 12 },
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                },
            },
            x: {
                grid: { display: false },
                ticks: {
                    font: { size: 12 },
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                },
            },
        },
    },
    pie: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right" as const,
                labels: {
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: "circle",
                    font: { size: 12 },
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                },
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 12,
                titleFont: { size: 14 },
                bodyFont: { size: 13 },
            },
        },
    },
    line: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    font: { size: 12 },
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                },
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 12,
                titleFont: { size: 14 },
                bodyFont: { size: 13 },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                },
                ticks: {
                    font: { size: 12 },
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                },
            },
            x: {
                grid: { display: false },
                ticks: {
                    font: { size: 12 },
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                },
            },
        },
    },
})
