const api = 'https://gradistore-spi.herokuapp.com/products/all'
const carousel = document.querySelector('#carousel');
const buttonLeft = document.querySelector('#carousel_left')
const buttonRight = document.querySelector('#carousel_right')

const carouselProducts = {
    async getProducts(urlApi, container) {
        try {
            const response = await fetch(urlApi);
            const data = await response.json();
            this.displayProducts(data.products.nodes, container);
        } catch (error) {
            console.log('Error:', error);
        }
    },

    validateRatingStars(rating, initialRange) {
        if (rating >= initialRange) {
            return 'filled';
        }
    },

    setHeight(count) {
        if (count % 2 === 0) {
            return '320';
        }
        return '400';
    },

    displayProducts(items, container) {
        let count = 1;
        items.forEach((item) => {
            container.innerHTML += `
          <div class="carousel-item" name="${count}">
              <div class="carousel-item-image" style="background-image: url(${item.featuredImage.url}); height: ${this.setHeight(
                count
            )}px;">
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
                          <span class="star-icon ${this.validateRatingStars(item.tags[0], 0)}">★</span>
                          <span class="star-icon ${this.validateRatingStars(item.tags[0], 100)}">★</span>
                          <span class="star-icon ${this.validateRatingStars(item.tags[0], 200)}">★</span>
                          <span class="star-icon ${this.validateRatingStars(item.tags[0], 300)}">★</span>
                          <span class="star-icon ${this.validateRatingStars(item.tags[0], 400)}">★</span>
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
        `;

            count += 1;
        });
    }
};

//carousel function
const carouselManager = {
  can_move_carousel: true,
  mobile: window.matchMedia("(min-width: 320px) and (max-width: 480px)"),
  tablet: window.matchMedia("(min-width: 768px) and (max-width: 1023px)"),

  init(buttonLeft, buttonRight, carousel) {
    buttonLeft.addEventListener("click", () => {
      if (this.can_move_carousel) {
        this.can_move_carousel = false;
        let firstElement = carousel.firstElementChild;
        let scrollX = -340;

        if (this.mobile.matches) {
          scrollX = -270;
        } else if (this.tablet.matches) {
          scrollX = -240;
        }

        carousel.style.transition = "transform 1s ease";
        carousel.style.transform = `translateX(${scrollX * 2}px)`;

        setTimeout(() => {
          carousel.appendChild(firstElement);
          carousel.style.transition = "none";
          carousel.style.transform = `translateX(${scrollX}px)`;
          this.can_move_carousel = true;
        }, 1000);
      }
    });

    buttonRight.addEventListener("click", () => {
      if (this.can_move_carousel) {
        this.can_move_carousel = false;
        let lastElement = carousel.lastElementChild;
        carousel.prepend(lastElement);

        let scrollX = -340;

        if (this.mobile.matches) {
          scrollX = -270;
        } else if (this.tablet.matches) {
          scrollX = -240;
        }

        carousel.style.transform = `translateX(${scrollX * 2}px)`;

        setTimeout(() => {
          carousel.style.transition = "transform 1s ease";
          carousel.style.transform = `translateX(${scrollX}px)`;
        }, 10);

        setTimeout(() => {
          carousel.style.transition = "none";
          this.can_move_carousel = true;
        }, 1000);
      }
    });
  }
};

carouselProducts.getProducts(api, carousel)
carouselManager.init(buttonLeft, buttonRight, carousel);