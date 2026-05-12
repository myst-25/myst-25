document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    
    // Check for saved theme preference; default to light if nothing is saved
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme (force light mode if no saved preference)
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateIcons('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateIcons('light');
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    });

    function updateIcons(theme) {
        if (theme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }

    // Education Cards Mobile Click Logic
    const eduCards = document.querySelectorAll('.edu-card');
    
    // Toggle popup on card click
    eduCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't close if clicking inside the popup itself
            if (e.target.closest('.flixer-popup')) return; 
            
            // Remove active from all other cards to keep only one open
            eduCards.forEach(c => {
                if (c !== card) c.classList.remove('active');
            });
            
            // Toggle the current card
            card.classList.toggle('active');
            e.stopPropagation(); // Prevent document click from immediately closing it
        });
    });

    // Close when clicking anywhere outside the cards
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.edu-card')) {
            eduCards.forEach(card => card.classList.remove('active'));
        }
    });

    // Close popups when scrolling the page
    document.addEventListener('scroll', () => {
        eduCards.forEach(card => card.classList.remove('active'));
    }, { passive: true });

    // Fetch Top GitHub Projects
    const githubProjectsContainer = document.getElementById('github-projects');
    if (githubProjectsContainer) {
        // Fetch up to 100 repos, sort by last updated
        fetch('https://api.github.com/users/myst-25/repos?sort=updated&per_page=100')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(repos => {
                // Filter out forks and sort by stars (highest first)
                const topRepos = repos
                    .filter(repo => !repo.fork)
                    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
                    .slice(0, 5); // Take top 5
                
                githubProjectsContainer.innerHTML = ''; // Clear loading message
                
                topRepos.forEach(repo => {
                    const el = document.createElement('a');
                    el.href = repo.html_url;
                    el.target = '_blank';
                    el.className = 'project-item';
                    
                    const lang = repo.language || 'Code';
                    const desc = repo.description || 'No description provided.';
                    
                    el.innerHTML = `
                        <div class="project-info">
                            <h3>${repo.name}</h3>
                            <p>${desc}</p>
                        </div>
                        <span class="project-meta">${lang}</span>
                    `;
                    
                    githubProjectsContainer.appendChild(el);
                });
            })
            .catch(error => {
                console.error('Error fetching GitHub repos:', error);
                githubProjectsContainer.innerHTML = '<div style="padding: 1.25rem 0; color: var(--text-secondary); font-size: 0.9rem;">Failed to load projects. Please visit my GitHub profile directly.</div>';
            });
    }
});
