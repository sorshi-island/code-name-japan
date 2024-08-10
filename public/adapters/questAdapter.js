class questAdapter {
    constructor(questPath) {
        this.questPath = questPath;
        this.questElement = null;
        this.questId = null;
    }

    async loadQuest() {
        this.questId = this.questPath.split('/').pop();

        const html = await this.loadHtml(`${this.questPath}/index.html`);
        const updatedHtml = this.updatePaths(html, this.questPath);

        this.questElement = document.createElement('div');
        this.questElement.innerHTML = updatedHtml;

        await this.loadCss(`${this.questPath}/styles.css`);
        await this.loadScript(`${this.questPath}/script.js`);
    }

    startQuest(){
        console.dir('You should define this method in sub adapter')
    }

    updatePaths(html, basePath) {
        return html
            .replace(/src="([^"]*)"/g, (match, p1) => `src="${basePath}/${p1}"`)
            .replace(/href="([^"]*)"/g, (match, p1) => `href="${basePath}/${p1}"`);
    }

    async loadHtml(htmlPath) {
        const response = await fetch(htmlPath);
        return await response.text();
    }

    async loadScript(scriptPath) {
        const response = await fetch(scriptPath);
        const scriptContent = await response.text();
        const scriptElement = document.createElement('script');
        scriptElement.textContent = scriptContent;
        this.questElement.appendChild(scriptElement);
    }

    async loadCss(cssPath) {
        const cssContent = await fetch(cssPath);
        document.head.insertAdjacentHTML('beforeend', `<style>${cssContent}</style>`);
    }

    markQuestAsCompleted() {
        let completedQuests = JSON.parse(localStorage.getItem('completedQuests')) || [];
        if (!completedQuests.includes(this.questId)) {
            completedQuests.push(this.questId);
            localStorage.setItem('completedQuests', JSON.stringify(completedQuests));
            // Обновляем информацию на главной странице
            if (typeof window.updateCompletedQuests === 'function') {
                window.updateCompletedQuests();
            }
        }
        closeQuest();
    }
}