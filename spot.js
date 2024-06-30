let images = {
    data: [
        {
            imageName: "Berlin",
            country: "Germany",
            city: "Berlin",
            image: "images/Berlin.png",
        },
        {
            imageName: "Brussels",
            country: "Belgium",
            city: "Brussels",
            image: "images/brussels.png",
        },
        {
            imageName: "Copenhagen",
            country: "Denmark",
            city: "Copenhagen",
            image: "images/copenhagen.png",
        },
        {
            imageName: "London",
            country: "United Kingdom",
            city: "London",
            image: "images/london.png",
        },
        {
            imageName: "Madrid",
            country: "Spain",
            city: "Madrid",
            image: "images/Madrid.png",
        },
        {
            imageName: "Moscow",
            country: "Russia",
            city: "Moscow",
            image: "images/Moscow.png",
        },
        {
            imageName: "Paris",
            country: "France",
            city: "Paris",
            image: "images/paris.png",
        },
        {
            imageName: "Rome",
            country: "Italy",
            city: "Rome",
            image: "images/rome.png",
        },
    ],
};

const originalData = [...images.data]; // Store a copy of the original data
const itemsPerPage = 4;
let currentPage = 1;

function displayImages(page) {
    document.getElementById("images").innerHTML = "";
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = images.data.slice(start, end);

    for (let i of paginatedItems) {
        let card = document.createElement("div");
        card.classList.add("card");

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        let image = document.createElement("img");
        image.setAttribute("src", i.image);
        imgContainer.appendChild(image);
        card.appendChild(imgContainer);

        let container = document.createElement("div");
        container.classList.add("container");

        let city = document.createElement("h5");
        city.classList.add("city-name");
        city.innerText = i.city.toUpperCase();
        container.appendChild(city);

        let country = document.createElement("h6");
        country.innerText = i.country;
        container.appendChild(country);

        card.appendChild(container);
        document.getElementById("images").appendChild(card);
    }
}

function setupPagination() {
    let totalPages = Math.ceil(images.data.length / itemsPerPage);
    let paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement("div");
        button.classList.add("pagination-button");
        button.innerText = i;
        button.addEventListener("click", function () {
            currentPage = i;
            displayImages(currentPage);
            setupPagination();
        });

        if (i === currentPage) {
            button.classList.add("active");
        }

        paginationContainer.appendChild(button);
    }
}

document.getElementById("search").addEventListener("click", () => {
    let searchInput = document.getElementById("search-input").value.toLowerCase();
    images.data = originalData.filter(image => 
        image.city.toLowerCase().includes(searchInput) || 
        image.country.toLowerCase().includes(searchInput)
    );
    currentPage = 1;
    displayImages(currentPage);
    setupPagination();
});

window.onload = () => {
    displayImages(currentPage);
    setupPagination();
};