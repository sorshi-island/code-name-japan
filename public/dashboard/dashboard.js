document.addEventListener('DOMContentLoaded', () => {
    const roadmap = [
        {
            page: 1,
            quests: [
                { id: 'basic-hack', title: 'Basic Hack', description: 'This is the "Basic Hack" quest', path: '/quests/basic-hack', completed: 5, releaseDate: '2024-01-01', lastUpdate: '2024-05-01' },
                { id: 'more-eleven', title: 'More Eleven', description: 'This is the "More Eleven" quest', path: '/quests/more-eleven', completed: 10, releaseDate: '2023-12-01', lastUpdate: '2024-04-01' },
                { id: 'third-quest', title: 'Third Quest', description: 'This quest is under development', path: '/quests/third-quest', completed: 0, releaseDate: '2024-06-01', lastUpdate: '2024-06-01' }
            ]
        }
        // Добавьте дополнительные страницы здесь
    ];

    const roadmapContainer = document.getElementById('roadmap');
    roadmap.forEach(page => {
        const pageElement = document.createElement('div');
        pageElement.classList.add('page');

        page.quests.forEach(quest => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.innerHTML = `
        <h2>${quest.title}</h2>
        <p>${quest.description}</p>
        <p>Completed: ${quest.completed}</p>
        <p>Release Date: ${quest.releaseDate}</p>
        <p>Last Update: ${quest.lastUpdate}</p>
        <button onclick="openQuest('${quest.path}')">Start Quest</button>
      `;
            pageElement.appendChild(tile);
        });

        roadmapContainer.appendChild(pageElement);
    });

    const completedQuestsElement = document.getElementById('completed-quests');
    const completedQuestsCount = roadmap.reduce((acc, page) => acc + page.quests.filter(quest => quest.completed > 0).length, 0);
    completedQuestsElement.textContent = completedQuestsCount;

    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-body');
    const closeModalButton = document.getElementById('close-modal');

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
        modalContent.innerHTML = '';
    });

    window.openQuest = async function(path) {
        const adapter = new QuestAdapter(path);
        await adapter.loadQuest();
        modalContent.innerHTML = '';
        modalContent.appendChild(adapter.questElement);
        modal.classList.remove('hidden');
        adapter.startQuest();
    };

    window.updateCompletedQuests = function() {
        const completedQuests = JSON.parse(localStorage.getItem('completedQuests')) || [];
        const questTiles = document.querySelectorAll('.tile');
        questTiles.forEach(tile => {
            const questId = tile.getAttribute('data-id');
            if (completedQuests.includes(questId)) {
                tile.classList.add('completed');
            }
        });
    };

});

document.addEventListener('DOMContentLoaded', () => {
    // Вызовите updateCompletedQuests при загрузке страницы
    updateCompletedQuests();

    const roadmap = [
        // ваш массив квестов
    ];

    // Остальная часть вашего кода для генерации плиток квестов

});

// Импортируйте адаптер
const script = document.createElement('script');
script.src = '/adapters/questAdapter.js';
script.onload = () => {
    console.log('QuestAdapter loaded');
};
document.head.appendChild(script);