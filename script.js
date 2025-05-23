const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('#search-btn');
const cartItem = document.querySelector('.cart-items-container')
const cartBtn = document.querySelector('#cart-btn')
const navbar = document.querySelector('.navbar')
const menuBtn = document.querySelector('#menu-btn')



searchBtn.addEventListener('click', ()=>{
    searchForm.classList.toggle('active');
    document.addEventListener('click', (e)=>{
        if(!e.composedPath().includes(searchBtn) && !e.composedPath().includes(searchForm) ){
            searchForm.classList.remove('active');
        }
    })
})

cartBtn.addEventListener('click', ()=>{
    cartItem.classList.toggle('active');
    document.addEventListener('click', (e)=>{
        if(!e.composedPath().includes(cartBtn) && !e.composedPath().includes(cartItem) ){
            cartItem.classList.remove('active');
        }
    })
})

menuBtn.addEventListener('click', ()=>{
    navbar.classList.toggle('active');
    document.addEventListener('click', (e)=>{
        if(!e.composedPath().includes(navbar) && !e.composedPath().includes(menuBtn) ){
            navbar.classList.remove('active');
        }
    })
})
// Modal for login
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.getElementById('close-modal');

    loginButton.onclick = () => {
        loginModal.style.display = 'flex';
    };

    closeModal.onclick = () => {
        loginModal.style.display = 'none';
    };

    window.onclick = (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        const loginForm = document.querySelector("#login-modal form");
    
        if (loginForm) {
            loginForm.addEventListener("submit", function (e) {
                e.preventDefault(); // prevent form submission
    
                const username = loginForm.querySelector("input[type='text']").value.trim();
                const password = loginForm.querySelector("input[type='password']").value.trim();
    
                // Optional: Basic validation
                if (username && password) {
                    // Simulate successful login and redirect
                    window.location.href = "dashboard.html"; // or index.html or any page
                } else {
                    alert("Please enter both username and password.");
                }
            });
        }
    });

    



