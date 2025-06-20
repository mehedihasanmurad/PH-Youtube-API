//time pathanor jonno
function getTimeString(time) {
    const hours = parseInt(time / 3600);
    const remainingSecond = time % 3600;
    const minutes = parseInt(remainingSecond / 60);
    const seconds = parseInt(remainingSecond / 60);
    return `${hours}hrs ${minutes}min ${seconds}sec ago`
}

const removeActiveClass = () => {
    const removeButton = document.getElementsByClassName("category-btn");
    for (const btn of removeButton) {
        btn.classList.remove("active");
    }
}

//data load korbo eikhane
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}

//category wise mane music a chap dile sudu music r baki button a click dile sudu seitar data dekhabe
const blogsCategory = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            //sobai ke active class remove koraw
            removeActiveClass();
            //id er class k add korai
            const activeButton = document.getElementById(`btn-${id}`);
            activeButton.classList.add("active");
            displayBlogs(data.category)
        })
        .catch(error => console.log(error))
}

const blogsDetails = async(detailId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${detailId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayBlogsDetails(data.video);
}

const displayBlogsDetails = (blog) => {
    console.log(blog);
    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
    <img class="w-full h-32 border" scr=${blog.thumbnail} />
    <p>${blog.description}</p>
    `
    // way-1
    // document.getElementById("showModalData").click();
    //way-2
    document.getElementById("customModal").showModal();
}

//user ba UI te dekhabo
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories");
    categories.forEach(category => {
        const buttonDiv = document.createElement("div");
        buttonDiv.innerHTML = `
            <button id="btn-${category.category_id}" onclick="blogsCategory(${category.category_id})" class="btn category-btn">${category.category}</button>
        `;
        categoriesContainer.appendChild(buttonDiv);
    })
}

//blogs data load korbe eikhane
const loadBlogs = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => displayBlogs(data.videos))
        .catch(error => console.log(error))
}
//blogs UI a dekhabo
const displayBlogs = (blogs) => {
    const blogsContainer = document.getElementById("blogs");
    blogsContainer.innerHTML = '';

    if (blogs.length === 0) {
        blogsContainer.classList.remove("grid");
        blogsContainer.innerHTML = `
            <div class="flex flex-col gap-5 justify-center items-center mt-20">
                <img class="w-32" src="assest/Icon.png" alt="">
                <h2 class="font-bold text-xl">Oops!! Sorry, There is no content here</h2>
            </div>
        `;
    }
    else {
        blogsContainer.classList.add("grid");
    }

    blogs.forEach((blog) => {
        // console.log(blog);
        const cart = document.createElement("div");
        cart.classList = "card shadow-lg";
        cart.innerHTML = `
        <figure class="relative">
            <img class="h-50 w-full"
            src=${blog.thumbnail}
            alt="Shoes" />
            ${blog.others.posted_date?.length === 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(blog.others.posted_date)}</span>`}
            
        </figure>
        <div class="flex gap-3 px-0 py-10">
            <div>
                <img class="w-10 h-10 rounded-full" src=${blog.authors[0].profile_picture}/>
            </div>
            <div>
                <h2 class="font-bold">${blog.title}</h2>
                <div class="flex items-center gap-3">
                    <p>${blog.authors[0].profile_name}</p>
                    ${blog.authors[0].verified === true ? `<img class="w-5" src="assest/verified.png" alt="">` : ''}
                </div>
                <div>
                    <p>${blog.others.views} views</p>
                </div>
                <div class="mt-2">
                    <button onclick="blogsDetails('${blog.video_id}')" class="btn bg-red-500 text-white">Details</button>
                </div>
            </div>
            
        </div>
        `;
        blogsContainer.appendChild(cart);
    })
}

loadCategories();
loadBlogs();