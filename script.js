let currentPhotos = [];
let currentPhotoIndex = 0;
let currentPage = 1;
let currentQuery = 'HD wallpaper';
let currentCategory = 'all';
let totalResults = 0;
const ITEMS_PER_PAGE = 32;

// Show loading spinner
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Modal functions
function openModal(photo, index) {
    currentPhotoIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    // Reset animation classes
    modalImage.classList.remove('modal-slide-out');
    modalImage.classList.add('modal-slide-in');
    
    modalImage.src = photo.src.original;
    modalImage.alt = photo.photographer;
    modal.classList.remove('hidden');
    updateNavigationButtons();

    // Enable touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    modalImage.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modalImage.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showPrevImage();
            } else {
                showNextImage();
            }
        }
    }
}

function closeModal() {
    const modalImage = document.getElementById('modalImage');
    modalImage.classList.remove('modal-slide-in');
    modalImage.classList.add('modal-slide-out');
    
    // Wait for animation to complete before hiding modal
    setTimeout(() => {
        document.getElementById('imageModal').classList.add('hidden');
    }, 300);
}

function updateNavigationButtons() {
    document.getElementById('prevImage').style.display = currentPhotoIndex > 0 ? 'block' : 'none';
    document.getElementById('nextImage').style.display = currentPhotoIndex < currentPhotos.length - 1 ? 'block' : 'none';
}

function showPrevImage() {
    if (currentPhotoIndex > 0) {
        const modalImage = document.getElementById('modalImage');
        modalImage.classList.remove('modal-slide-in');
        modalImage.classList.add('modal-slide-out');
        
        setTimeout(() => {
            currentPhotoIndex--;
            const photo = currentPhotos[currentPhotoIndex];
            modalImage.classList.remove('modal-slide-out');
            modalImage.classList.add('modal-slide-in');
            modalImage.src = photo.src.original;
            modalImage.alt = photo.photographer;
            updateNavigationButtons();
        }, 150);
    }
}

function showNextImage() {
    if (currentPhotoIndex < currentPhotos.length - 1) {
        const modalImage = document.getElementById('modalImage');
        modalImage.classList.remove('modal-slide-in');
        modalImage.classList.add('modal-slide-out');
        
        setTimeout(() => {
            currentPhotoIndex++;
            const photo = currentPhotos[currentPhotoIndex];
            modalImage.classList.remove('modal-slide-out');
            modalImage.classList.add('modal-slide-in');
            modalImage.src = photo.src.original;
            modalImage.alt = photo.photographer;
            updateNavigationButtons();
        }, 150);
    }
}

async function downloadImage() {
    const photo = currentPhotos[currentPhotoIndex];
    try {
        const response = await fetch(photo.src.original);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wallpaper-${photo.id}.jpg`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}

// Pagination functions
function updatePagination(total) {
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = '';

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        pageNumbers.innerHTML += `<button class="page-number bg-gray-800 text-white w-10 h-10 rounded-lg hover:bg-purple-600 transition-colors duration-300" data-page="1">1</button>`;
        if (startPage > 2) {
            pageNumbers.innerHTML += '<span class="px-2">...</span>';
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.innerHTML += `
            <button class="page-number ${i === currentPage ? 'bg-purple-500' : 'bg-gray-800'} text-white w-10 h-10 rounded-lg hover:bg-purple-600 transition-colors duration-300" data-page="${i}">
                ${i}
            </button>
        `;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbers.innerHTML += '<span class="px-2">...</span>';
        }
        pageNumbers.innerHTML += `<button class="page-number bg-gray-800 text-white w-10 h-10 rounded-lg hover:bg-purple-600 transition-colors duration-300" data-page="${totalPages}">${totalPages}</button>`;
    }

    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

// Category functions
function updateCategoryChips() {
    document.querySelectorAll('.category-chip').forEach(chip => {
        if (chip.dataset.category === currentCategory) {
            chip.classList.add('bg-purple-500');
            chip.classList.remove('bg-gray-800');
        } else {
            chip.classList.remove('bg-purple-500');
            chip.classList.add('bg-gray-800');
        }
    });
}

// Main fetch function
async function fetchWallpapers() {
    showLoading();

    const API_KEY = 'gcibLc4QCRigPYVzm9MjQ4ioBnFXAy7fnHl9m6JY8GWOAGV4lCg3jxgY';
    let query = currentQuery;
    if (currentCategory !== 'all') {
        query = `${currentCategory} ${query}`;
    }
    
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${ITEMS_PER_PAGE}&page=${currentPage}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        const wallpapersDiv = document.getElementById('wallpapers');
        wallpapersDiv.innerHTML = '';
        currentPhotos = data.photos || [];
        totalResults = data.total_results;

        if (currentPhotos.length > 0) {
            currentPhotos.forEach((photo, index) => {
                const card = document.createElement('div');
                card.className = 'relative group overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105';
                
                const img = document.createElement('img');
                img.src = photo.src.large;
                img.alt = photo.photographer;
                img.className = 'w-full h-64 object-cover';
                
                const overlay = document.createElement('div');
                overlay.className = 'absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100';
                
                const viewButton = document.createElement('button');
                viewButton.className = 'bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300';
                viewButton.innerHTML = '<i class="fas fa-eye mr-2"></i>View';
                viewButton.onclick = () => openModal(photo, index);
                
                overlay.appendChild(viewButton);
                card.appendChild(img);
                card.appendChild(overlay);
                wallpapersDiv.appendChild(card);
            });

            updatePagination(totalResults);
        } else {
            wallpapersDiv.innerHTML = '<p class="text-center col-span-full text-gray-400 text-lg">No wallpapers found. Try a different search term.</p>';
        }
    } catch (error) {
        console.error('Error fetching wallpapers:', error);
        document.getElementById('wallpapers').innerHTML = '<p class="text-center col-span-full text-red-500 text-lg">Failed to fetch wallpapers. Please try again later.</p>';
    } finally {
        hideLoading();
    }
}

// Event Listeners
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('prevImage').addEventListener('click', showPrevImage);
document.getElementById('nextImage').addEventListener('click', showNextImage);
document.getElementById('downloadImage').addEventListener('click', downloadImage);

// Search functionality
function performSearch() {
    currentQuery = document.getElementById('searchInput').value || 'HD wallpaper';
    currentPage = 1;
    fetchWallpapers();
}

// Search Input with debouncing
const searchInput = document.getElementById('searchInput');
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 500);
});

// Search button click
document.getElementById('searchButton').addEventListener('click', performSearch);

// Search on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Category Chips
document.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        currentCategory = chip.dataset.category;
        currentPage = 1;
        updateCategoryChips();
        fetchWallpapers();
    });
});

// Pagination
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchWallpapers();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    fetchWallpapers();
});

document.getElementById('pageNumbers').addEventListener('click', (e) => {
    if (e.target.classList.contains('page-number')) {
        currentPage = parseInt(e.target.dataset.page);
        fetchWallpapers();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('imageModal').classList.contains('hidden')) return;
    
    switch (e.key) {
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
        case 'Escape':
            closeModal();
            break;
    }
});

// Initial load
fetchWallpapers();
