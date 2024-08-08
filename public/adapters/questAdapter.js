class QuestAdapter {
    constructor(questPath) {
        this.questPath = questPath;
    }

    async loadQuest() {
        const response = await fetch(`${this.questPath}/index.html`);
        const html = await response.text();

        // Обновляем пути для всех ресурсов
        const updatedHtml = this.updatePaths(html, this.questPath);

        const cssResponse = await fetch(`${this.questPath}/styles.css`);
        const css = await cssResponse.text();
        const jsResponse = await fetch(`${this.questPath}/script.js`);
        const js = await jsResponse.text();

        this.questElement = document.createElement('div');
        this.questElement.innerHTML = updatedHtml;
        document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
        eval(js);
    }

    updatePaths(html, basePath) {
        // Обновляем пути для тегов img, link, script
        return html
            .replace(/src="([^"]*)"/g, (match, p1) => `src="${basePath}/${p1}"`)
            .replace(/href="([^"]*)"/g, (match, p1) => `href="${basePath}/${p1}"`);
    }
}