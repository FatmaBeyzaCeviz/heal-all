/**
 * 1. SAYFA YÖNETİMİ
 */
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    const selectedPage = document.getElementById(pageId + '-page');
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
}

// Site açıldığında otomatik ana sayfayı göster
window.onload = function() {
    showPage('home');
};

/**
 *  Tarifler 
 */
const recipeData = {
    'blueberry': {
        title: 'Blueberry Oatmeal Bowl',
        img: 'breakfast1.jpg',
        ingredients: ['1 cup organic oats', '1/2 cup fresh blueberries', '1 tbsp honey', 'Handful of walnuts'],
        instructions: 'Cook oats with milk or water. Top with fresh blueberries, honey, and walnuts.'
    },
    'avocado': {
        title: 'Poached Egg Avocado Toast',
        img: 'breakfast2.jpg',
        ingredients: ['2 slices sourdough bread', '1 ripe avocado', '2 organic eggs', 'Chili flakes'],
        instructions: 'Toast the bread. Mash avocado on top. Add poached eggs and sprinkle with spices.'
    },
    'salmon': {
        title: 'Garlic Butter Salmon',
        img: 'Garlic Butter Salmon Recipe.jpg',
        ingredients: ['2 Salmon fillets', '3 cloves garlic', '2 tbsp butter', 'Fresh lemon slices'],
        instructions: 'Season salmon with salt and pepper. Pan-fry with butter and garlic until golden brown.'
    },
    'zucchini': {
        title: 'Zucchini Noodles with Pesto',
        img: 'Zucchini Noodles with Pesto.jpg',
        ingredients: ['3 medium zucchinis', '1/2 cup pesto sauce', 'Cherry tomatoes', 'Parmesan'],
        instructions: 'Spiralize zucchinis. Sauté with pesto and tomatoes in a pan for 2-3 minutes.'
    }
};

const homeDetails = {
    'natural': {
        title: 'Natural Ingredients',
        description: 'Using natural ingredients means consuming food in its most nutrient-dense form.',
        linkSuggestion: 'For more information, visit <a href="https://www.healthline.com" target="_blank">Healthline</a>.',
        tips: ['Shop at local farmers markets.', 'Check labels for synthetic additives.']
    },
    'easy': {
        title: 'Easy Cooking Techniques',
        description: 'Healthy eating does not have to be time-consuming.',
        linkSuggestion: 'Check out <a href="https://www.jamieoliver.com" target="_blank">Jamie Oliver</a>.',
        tips: ['Prep vegetables on Sunday.', 'Use an air fryer to save time.']
    },
    'macros': {
        title: 'Understanding Balanced Macros',
        description: 'Macronutrients are the building blocks of your diet.',
        linkSuggestion: 'Try <a href="https://www.myfitnesspal.com" target="_blank">MyFitnessPal</a>.',
        tips: ['Include protein in every meal.', 'Don’t fear healthy fats.']
    }
};

/**
 * 3. MODAL VE DETAY PENCERESİ FONKSİYONLARI
 */
function openRecipe(id) {
    const r = recipeData[id];
    const modalBody = document.getElementById('modalBody');
    if (!r) return;

    modalBody.innerHTML = `
        <img src="${r.img}" class="modal-img" style="width:100%; border-radius:15px; height:350px; object-fit:cover;">
        <div class="recipe-details" style="padding:20px;">
            <h2 style="color:#d78f57;">${r.title}</h2>
            <h3 style="margin-top:15px; border-bottom:1px solid #ddd;">Ingredients</h3>
            <ul style="padding-left:20px; margin-top:10px;">${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
            <h3 style="margin-top:15px; border-bottom:1px solid #ddd;">Instructions</h3>
            <p style="margin-top:10px; line-height:1.6;">${r.instructions}</p>
        </div>
    `;
    document.getElementById('recipeModal').style.display = 'block';
}

function openHomeDetail(key) {
    const data = homeDetails[key];
    const modalBody = document.getElementById('modalBody');
    if (!data) return;

    modalBody.innerHTML = `
        <div class="recipe-details" style="padding:10px;">
            <h2 style="color:#d78f57;">${data.title}</h2>
            <p>${data.description}</p>
            <h3 style="color:#4CAF50;">💡 Quick Tips</h3>
            <ul>${data.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
            <h3 style="color:#4CAF50;">🌐 External Resources</h3>
            <p>${data.linkSuggestion}</p>
        </div>
    `;
    document.getElementById('recipeModal').style.display = 'block';
}

function closeRecipe() {
    document.getElementById('recipeModal').style.display = 'none';
}

// Pencere dışına tıklama
window.onclick = function(event) {
    const modal = document.getElementById('recipeModal');
    if (event.target == modal) {
        closeRecipe();
    }
}

/**
 * 4. İLETİŞİM FORMU
 */
function handleContact(event) {
    event.preventDefault();
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';
}

/**
 * 5. ARAMA 
 */
function searchRecipes() {
    const input = document.getElementById('recipeSearch');
    const filter = input.value.toLowerCase();
    const suggestionsBox = document.getElementById('searchSuggestions');
    
    suggestionsBox.innerHTML = '';

    if (filter.length === 0) {
        suggestionsBox.style.display = 'none';
        return;
    }

    const matches = Object.keys(recipeData).filter(key => 
        recipeData[key].title.toLowerCase().includes(filter)
    );

    if (matches.length > 0) {
        suggestionsBox.style.display = 'block';
        matches.forEach(key => {
            const div = document.createElement('div');
            div.classList.add('suggestion-item');
            div.innerText = recipeData[key].title;
            
            div.onclick = function() {
                showPage('recipes');
                openRecipe(key);
                input.value = '';
                suggestionsBox.style.display = 'none';
            };
            suggestionsBox.appendChild(div);
        });
    } else {
        suggestionsBox.style.display = 'none';
    }
}


document.addEventListener('click', function(e) {
    const suggestionsBox = document.getElementById('searchSuggestions');
    if (e.target.id !== 'recipeSearch' && suggestionsBox) {
        suggestionsBox.style.display = 'none';
    }
});