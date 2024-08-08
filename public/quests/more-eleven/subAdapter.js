class MoreElevenSubAdapter {

    start() {
        bind()
        if (typeof generateNewNumbers === 'function') {
            generateNewNumbers();
        } else {
            console.error("Function generateNewNumbers not found.");
        }
    }
}

// Устанавливаем SubAdapter в глобальную область видимости
window.SubAdapter = new MoreElevenSubAdapter();