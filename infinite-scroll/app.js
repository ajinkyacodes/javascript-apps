const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API Documentation https://unsplash.com/documentation
const API_KEY = 'pNmNLHCOBm1Qi1K-TZisteOUCtF03ImavT_GjsIDOAQ';
const PHOTO_COUNT = 10;
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${PHOTO_COUNT}`;

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and photos. Add to DOM
function displayPhotos() {
    // Run function for each object in photosArray
    photosArray.forEach((photo)=> {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create image for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(API_URL);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        // Catch error Here
    }
}

// On Load
getPhotos();