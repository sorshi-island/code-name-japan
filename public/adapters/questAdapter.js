class QuestAdapter {
    constructor(questPath) {
        this.questPath = questPath;
        this.questElement = null;
        this.subAdapter = null;
        this.questId = null;
    }

    async loadQuest() {
        const response = await fetch(`${this.questPath}/index.html`);
        const html = await response.text();

        this.questId = this.questPath.split('/').pop();

        const updatedHtml = this.updatePaths(html, this.questPath);

        const cssResponse = await fetch(`${this.questPath}/styles.css`);
        const css = await cssResponse.text();

        // Создаем элемент для квеста
        this.questElement = document.createElement('div');
        this.questElement.innerHTML = updatedHtml;
        document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

        // Загружаем и выполняем скрипты в контексте квеста
        await this.loadAndExecuteScript(`${this.questPath}/script.js`);
        await this.loadAndExecuteScript(`${this.questPath}/subAdapter.js`);

        // Устанавливаем SubAdapter, если он определен
        if (typeof SubAdapter !== 'undefined') {
            console.dir('SubAdapter loaded');
            this.setSubAdapter(SubAdapter);
        } else {
            console.error("SubAdapter is not defined.");
        }
    }

    updatePaths(html, basePath) {
        return html
            .replace(/src="([^"]*)"/g, (match, p1) => `src="${basePath}/${p1}"`)
            .replace(/href="([^"]*)"/g, (match, p1) => `href="${basePath}/${p1}"`);
    }

    async loadAndExecuteScript(scriptPath) {
        const response = await fetch(scriptPath);
        const scriptContent = await response.text();

        eval(scriptContent);

        const scriptElement = document.createElement('script');
        scriptElement.textContent = scriptContent;
        this.questElement.appendChild(scriptElement);
    }

    startQuest() {
        if (this.subAdapter && typeof this.subAdapter.start === 'function') {
            this.subAdapter.start();
        } else {
            console.error("SubAdapter start function is not defined or subAdapter is not set.");
        }
    }

    setSubAdapter(subAdapter) {
        this.subAdapter = subAdapter;
        if (this.subAdapter && typeof this.subAdapter.setQuestAdapter === 'function') {
            this.subAdapter.setQuestAdapter(this);
        } else {
            console.error("SubAdapter setQuestAdapter function is not defined or subAdapter is not set.");
        }
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