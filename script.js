// Gallery data with image paths and descriptions
const galleries = {
    'zurnalar': {
        title: 'Zurnalar',
        images: [
            '2_zurna-erik-agaci-profesyonel-resim-31768.jpg',
            'images (1).jpeg',
            'indir (1).jpeg',
            'indir.jpeg'
        ],
        descriptions: [
            'Profesyonel erik ağacı zurna',
            'Geleneksel zurna yapımı',
            'El işçiliği zurna detayı',
            'Klasik zurna modeli'
        ]
    },
    'meyler': {
        title: 'Meyler',
        images: [
            'images.jpeg',
            'indir (1).jpeg',
            'indir (5).jpeg'
        ],
        descriptions: [
            'Geleneksel mey',
            'El yapımı mey detayı',
            'Profesyonel mey yapımı'
        ]
    },
    'balabanlar': {
        title: 'Balabanlar',
        images: [
            'images.jpeg',
            'indir (1).jpeg',
            'indir.jpeg'
        ],
        descriptions: [
            'Geleneksel balaban',
            'El işçiliği balaban',
            'Profesyonel balaban'
        ]
    },
    'karışık': {
        title: 'Karışık',
        images: [
            '2_1828378410187258.jpg',
            'images.jpeg',
            'indir (2).jpeg',
            'indir (3).jpeg',
            'indir (4).jpeg'
        ],
        descriptions: [
            'Çeşitli müzik aletleri',
            'Karışık ürün koleksiyonu',
            'Farklı model örnekleri',
            'Çok çeşitli ürünler',
            'Özel tasarım aletler'
        ]
    },
    'organizasyon': {
        title: 'Davul-Zurna Organizasyonları',
        images: [
            'indir.jpeg',
            'indir (1).jpeg',
            'indir (2).jpeg'
        ],
        descriptions: [
            'Düğün organizasyonları',
            'Sünnet törenleri',
            'Özel gün etkinlikleri'
        ]
    }
};

// Function to create gallery HTML
function createGalleryHTML(folderName, galleryData) {
    const galleryDiv = document.createElement('div');
    galleryDiv.className = 'gallery';
    
    let html = `<h3>${galleryData.title}</h3><div class="gallery-grid">`;
    
    galleryData.images.forEach((image, index) => {
        const description = galleryData.descriptions[index] || galleryData.title;
        html += `
            <div class="image-container">
                <img src="${folderName}/${image}" alt="${description}" 
                     onerror="this.style.display='none'" 
                     onload="this.style.opacity='1'">
                <p class="image-caption">${description}</p>
            </div>
        `;
    });
    
    html += '</div>';
    galleryDiv.innerHTML = html;
    return galleryDiv;
}

// Function to load product galleries (excluding organization)
function loadGalleries() {
    const galleriesSection = document.getElementById('galleries');
    const existingGalleries = galleriesSection.querySelectorAll('.gallery');
    
    // Remove existing galleries
    existingGalleries.forEach(gallery => gallery.remove());
    
    // Create new galleries (exclude organization)
    Object.keys(galleries).forEach(folderName => {
        if (folderName !== 'organizasyon') {
            const galleryHTML = createGalleryHTML(folderName, galleries[folderName]);
            galleriesSection.appendChild(galleryHTML);
        }
    });
}

// Function to load organization gallery
function loadOrganizationGallery() {
    const organizationSection = document.getElementById('organization-gallery');
    
    if (galleries['organizasyon']) {
        const galleryHTML = createGalleryHTML('organizasyon', galleries['organizasyon']);
        organizationSection.appendChild(galleryHTML);
    }
}

// Add smooth scrolling for internal links
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading animations
function addLoadingAnimations() {
    const images = document.querySelectorAll('.gallery img');
    images.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.1}s`;
    });
}

// WhatsApp button functionality
function setupWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            // Optional: Add analytics tracking here
            console.log('WhatsApp button clicked');
        });
    }
}

// Image error handling
function setupImageErrorHandling() {
    const images = document.querySelectorAll('.gallery img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log(`Failed to load image: ${this.src}`);
            this.style.display = 'none';
        });
    });
}

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Load product galleries dynamically
    loadGalleries();
    
    // Load organization gallery
    loadOrganizationGallery();
    
    // Setup smooth scrolling
    addSmoothScrolling();
    
    // Setup WhatsApp button
    setupWhatsAppButton();
    
    // Add loading animations
    setTimeout(addLoadingAnimations, 100);
    
    // Setup image error handling
    setTimeout(setupImageErrorHandling, 200);
    
    console.log('Mustafa Aktaş Müzik Aletleri website loaded successfully!');
});

// Add some interactive features
document.addEventListener('scroll', function() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // WhatsApp button opacity
    if (window.scrollY > 300) {
        whatsappButton.style.opacity = '1';
    } else {
        whatsappButton.style.opacity = '0.8';
    }
    
    // Hide scroll indicator after scrolling down a bit
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
    }
});

// Add click to zoom functionality for images
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG' && e.target.closest('.gallery')) {
        const img = e.target;
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        `;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    }
});
