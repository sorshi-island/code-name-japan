document.addEventListener('DOMContentLoaded', () => {
    /**
     * Manually added list of quests
     * @type {[{quests: [{path: string, releaseDate: string, lastUpdate: string, description: string, id: string, completed: number, title: string},{path: string, releaseDate: string, lastUpdate: string, description: string, id: string, completed: number, title: string},{path: string, releaseDate: string, lastUpdate: string, description: string, id: string, completed: number, title: string}], page: number}]}
     */
    const roadmap = [
        {
            page: 1,
            quests: [
                {
                    id: 'basic-hack',
                    title: 'Basic Hack',
                    description: 'In this quest you in role of hacker.',
                    path: '/quests/basic-hack',
                    releaseDate: '2024-03-11',
                    lastUpdate: '2024-03-11'
                },
                {
                    id: 'more-eleven',
                    title: 'More Eleven',
                    description: 'This is the "More Eleven" quest',
                    path: '/quests/more-eleven',
                    releaseDate: '2023-08-06',
                    lastUpdate: '2024-08-08'
                },
                {
                    id: 'third-quest',
                    title: 'Third Quest',
                    description: 'This quest is under development',
                    path: '/quests/third-quest',
                    releaseDate: '2024-06-01',
                    lastUpdate: '2024-06-01'
                }
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
            tile.setAttribute('data-id', quest.id)
            tile.innerHTML = `
       
       <div class="completed-badge">⭐</div>
       <div class="quest-general-info">
            <div class="quest-general-info-left-panel">
                <div class="quest-general-info-left-panel-name">${quest.title}</div>
                <div class="quest-general-info-left-panel-release-date">
                Release Date: ${quest.releaseDate}
                  <div class="quest-additional-info">
                   <p>${quest.description}</p>
                   <p>Last Update: ${quest.lastUpdate}</p>
                   <button class="quest-tile-start-button" onclick="openQuest('${quest.path}')">Start Quest</button>
                </div>
                </div>
            </div>
            <div class="quest-logo">
                <img alt="logo" src="${quest.path}/logo.webp">
            </div>
       </div>
        
      `;
            pageElement.appendChild(tile);
        });

        roadmapContainer.appendChild(pageElement);
    });

    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-body');
    const closeModalButton = document.getElementById('close-modal');

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
        modalContent.innerHTML = '';
    });

    window.openQuest = async function (path) {
        const adapter = new QuestAdapter(path);
        await adapter.loadQuest();
        modalContent.innerHTML = '';
        modalContent.appendChild(adapter.questElement);
        modal.classList.remove('hidden');
        adapter.startQuest();
    };

    window.updateCompletedQuests = function () {
        const completedQuests = JSON.parse(localStorage.getItem('completedQuests')) || [];

        const headerBlock = document.getElementById('completed-quests')
        headerBlock.textContent = completedQuests.length.toString();

        const questTiles = document.querySelectorAll('.tile');
        questTiles.forEach(tile => {
            const questId = tile.getAttribute('data-id');
            if (completedQuests.includes(questId)) {
                tile.classList.add('completed');
            }
        });
    };

    updateCompletedQuests();

});

// Импортируйте адаптер
const script = document.createElement('script');
script.src = '/adapters/questAdapter.js';
script.onload = () => {
    console.log('QuestAdapter loaded');
};
document.head.appendChild(script);