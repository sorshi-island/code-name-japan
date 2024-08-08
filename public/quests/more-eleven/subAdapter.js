class MoreElevenSubAdapter {

    start() {
        bind(this)
        if (typeof generateNewNumbers === 'function') {
            generateNewNumbers();
        } else {
            console.error("Function generateNewNumbers not found.");
        }
    }

    setQuestAdapter(adapter) {
        this.questAdapter = adapter;
    }

    completeQuest() {
        if (this.questAdapter && typeof this.questAdapter.markQuestAsCompleted === 'function') {
            this.questAdapter.markQuestAsCompleted();
        } else {
            console.error("QuestAdapter markQuestAsCompleted function is not defined.");
        }
    }
}

// Устанавливаем SubAdapter в глобальную область видимости
window.SubAdapter = new MoreElevenSubAdapter();