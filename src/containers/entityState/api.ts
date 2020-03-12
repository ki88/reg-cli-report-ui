const key = 'entityState';

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time))
}

const reportId = (document.getElementById('app') as HTMLElement).dataset.reportId as string;

export const api = {
    getReportData: async () => {
        await delay(100);
        try {
            const data = JSON.parse(localStorage.getItem(key) || '{}');
            return data[reportId];
        } catch (e) {
            return null;
        }
    },

    setReportData: async (value: any) => {
        await delay(100);
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        data[reportId] = value;
        localStorage.setItem(key, JSON.stringify(data))
    }
};