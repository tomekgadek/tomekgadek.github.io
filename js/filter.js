document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.menu a');
    const divs = document.querySelectorAll('.content');
    // Pobieramy nowy przycisk resetujący
    const resetButton = document.getElementById('reset'); 

    // Wczytaj stan z localStorage
    let activeTag = localStorage.getItem('activeTag');

    function applyFilter(tag) {
        // ... (Logika filtrowania divów pozostaje bez zmian) ...
        divs.forEach(div => {
            const tags = div.dataset.tags.split(' ');
            if (!tag || tags.includes(tag)) {
                div.style.display = '';
            } else {
                div.style.display = 'none';
            }
        });

        // Logika ustawiania/usuwania klasy 'active' na linkach
        links.forEach(link => {
            if (link.dataset.tag === tag) {
                link.classList.add('active');
                link.blur(); // Usuń focus po aktywacji
            } else {
                link.classList.remove('active');
            }
        });

        if (tag) {
            localStorage.setItem('activeTag', tag);
        } else {
            localStorage.removeItem('activeTag');
        }
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tag = link.dataset.tag;
            
            // Włącz filtr TYLKO jeśli nie jest już aktywny
            if (!link.classList.contains('active')) {
                applyFilter(tag);
            } 
            // W tym podejściu to kliknięcie na aktywny link już NIC nie robi, 
            // bo resetuje tylko przycisk "Wyczyść Filtr".
            
            // Opcjonalnie: Jeśli chcesz, aby kliknięcie na aktywny link go zresetowało, 
            // zachowaj starą logikę. Ale skoro miała problemy, lepiej ją usunąć.
        });
    });

    // NOWA OBSŁUGA PRZYCISKU RESETU
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            applyFilter(null); // Resetuje stan filtru
            resetButton.blur(); // Usuń focus z przycisku
        });
    }

    // Przywrócenie stanu po odświeżeniu
    if (activeTag) {
        applyFilter(activeTag);
    } else {
        applyFilter(null);
    }
});