const carousel = document.querySelector('#carousel');

async function getProducts() {
    try {
      const response = await fetch('https://gradistore-spi.herokuapp.com/products/all');
      const data = await response.json();
      displayProducts(data.products.nodes);
    } catch (error) {
      console.log('Error:', error);
    }
  }

function validateRatingStars(rating, initialRange){
    if(rating >= initialRange){
        return 'filled'
    }
}

function setHeight(count){
    if (count%2 == 0) {
        return '320'
    }
    return '400'    
}

function displayProducts(items){
    let count = 1
    items.forEach(item => {
        carousel.innerHTML += `
        <div class="carousel-item" name="${count}">
            <div class="carousel-item-image" style="background-image: url(${item.featuredImage.url}); height: ${setHeight(count)}px;">
                <button>
                    add to card
                </button>
            </div>
            <div class="carousel-item-info">
                <h6>
                    ${item.title}
                </h6>
                <div class="carousel-item-stars">
                    <div>  
                        <span class="star-icon ${validateRatingStars(item.tags[0], 0)}">★</span>
                        <span class="star-icon ${validateRatingStars(item.tags[0], 100)}">★</span>
                        <span class="star-icon ${validateRatingStars(item.tags[0], 200)}">★</span>
                        <span class="star-icon ${validateRatingStars(item.tags[0], 300)}">★</span>
                        <span class="star-icon ${validateRatingStars(item.tags[0], 400)}">★</span>
                        <p>
                            (${item.tags[0]})
                        </p>
                    </div>
                    <div>
                        <span class="old_price">€${item.prices.max.amount}</span>
                        <span class="actually_price">€${item.prices.min.amount}</span>
                    </div>
                </div>
            </div>
        </div>

        `

        count += 1
        }
    )
}

getProducts()


//carousel function
const buttonLeft = document.querySelector('#carousel_left')
const buttonRight = document.querySelector('#carousel_right')
let can_move_carousel = true

//responsive
const mobile = window.matchMedia("(min-width: 320px) and (max-width: 480px)")
const tablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)")

//listo

buttonLeft.addEventListener("click", () => {
    if(can_move_carousel){
        can_move_carousel = false
        let firts = carousel.firstElementChild
        let desplazamientoX = -340

        if(mobile.matches) {
            desplazamientoX = -270;
        }else if(tablet.matches){
            desplazamientoX = -240;
        }
        
        carousel.style.transition = "transform 1s ease"; // Valor en píxeles
        carousel.style.transform = `translateX(${desplazamientoX * 2}px)`;
        setTimeout(() => {
            carousel.appendChild(firts)
            carousel.style.transition = "none";
            carousel.style.transform = `translateX(${desplazamientoX}px)`;
            can_move_carousel = true
        }, 1000);
    }
})

buttonRight.addEventListener("click", () => {
    if(can_move_carousel){
        can_move_carousel = false
        let last = carousel.lastElementChild
        carousel.prepend(last)

        let desplazamientoX = -340

        if(mobile.matches) {
            desplazamientoX = -270;
        }else if(tablet.matches){
            desplazamientoX = -240;
        }

        carousel.style.transform = `translateX(${desplazamientoX * 2}px)`;

        setTimeout(() => { // Valor en píxeles
            carousel.style.transition = "transform 1s ease";
            carousel.style.transform = `translateX(${desplazamientoX}px)`;
        }, 10);

        setTimeout(()=>{
            carousel.style.transition = "none";
            can_move_carousel = true
        }, 1000)
    }
    
})