// Мобильное меню
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Закрытие меню при клике на ссылку
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Обработка формы
const tourForm = document.getElementById("tourForm");
if (tourForm) {
  tourForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name =
      this.querySelector('input[type="text"]').value || "пользователь";

    alert(
      `Спасибо, ${name}! Ваша заявка на тур принята. Мы свяжемся с вами в ближайшее время.`
    );
    this.reset();
  });
}

// Изменение стиля навигации при прокрутке
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(44, 62, 80, 0.98)";
    header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.backgroundColor = "rgba(44, 62, 80, 0.95)";
    header.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.1)";
  }
});

// Анимация появления элементов при прокрутке
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

// Наблюдаем за элементами, которые нужно анимировать
document
  .querySelectorAll(".tour-card, .country-item, .about-content > div")
  .forEach((el) => {
    observer.observe(el);
  });

// Добавление простой анимации для элементов
const style = document.createElement("style");
style.textContent = `
    .tour-card, .country-item, .about-content > div {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .tour-card.animated, .country-item.animated, .about-content > div.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Слайдер отзывов - исправленная версия
class ReviewSlider {
  constructor() {
    this.slider = document.querySelector(".review-slider");
    this.slides = document.querySelectorAll(".review-slide");
    this.dots = document.querySelectorAll(".review-dot");
    this.prevBtn = document.querySelector(".review-prev");
    this.nextBtn = document.querySelector(".review-next");
    this.currentSlide = 0;
    this.slideInterval = null;
    this.isAutoPlaying = true;

    if (!this.slider || this.slides.length === 0) return;

    this.init();
  }

  init() {
    // Инициализация слайдера
    this.updateSliderPosition();

    // Обработчики для кнопок
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide());
    }

    // Обработчики для точек
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Автопрокрутка
    this.startAutoSlide();

    // Остановка автопрокрутки при наведении
    this.slider.addEventListener("mouseenter", () => this.stopAutoSlide());
    this.slider.addEventListener("mouseleave", () => {
      if (this.isAutoPlaying) this.startAutoSlide();
    });

    // Остановка автопрокрутки при касании на мобильных
    this.slider.addEventListener("touchstart", () => this.stopAutoSlide());
    this.slider.addEventListener("touchend", () => {
      if (this.isAutoPlaying) this.startAutoSlide();
    });
  }

  updateSliderPosition() {
    this.slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;

    // Обновляем активные точки
    this.dots.forEach((dot) => dot.classList.remove("active"));
    if (this.dots[this.currentSlide]) {
      this.dots[this.currentSlide].classList.add("active");
    }
  }

  prevSlide() {
    this.currentSlide--;
    if (this.currentSlide < 0) {
      this.currentSlide = this.slides.length - 1;
    }
    this.updateSliderPosition();
    this.restartAutoSlide();
  }

  nextSlide() {
    this.currentSlide++;
    if (this.currentSlide >= this.slides.length) {
      this.currentSlide = 0;
    }
    this.updateSliderPosition();
    this.restartAutoSlide();
  }

  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlide = index;
      this.updateSliderPosition();
      this.restartAutoSlide();
    }
  }

  startAutoSlide() {
    this.isAutoPlaying = true;
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide() {
    this.isAutoPlaying = false;
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  restartAutoSlide() {
    this.stopAutoSlide();
    if (this.isAutoPlaying) {
      this.startAutoSlide();
    }
  }
}

// Инициализация слайдера после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  new ReviewSlider();
});

// Модальное окно для добавления отзыва
const addReviewBtn = document.querySelector(".add-review-btn");
let reviewModal = document.querySelector(".review-modal");

// Если модальное окно еще не создано, создаем его
if (!reviewModal) {
  reviewModal = document.createElement("div");
  reviewModal.className = "review-modal";
  reviewModal.innerHTML = `
        <div class="modal-content">
            <button type="button" class="modal-close" aria-label="Закрыть">
                <i class="fas fa-times"></i>
            </button>
            <h3>Добавить отзыв</h3>
            <form id="reviewForm">
                <div class="form-group">
                    <input type="text" placeholder="Ваше имя" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Ваш email" required>
                </div>
                <div class="form-group">
                    <select required>
                        <option value="" disabled selected>Выберите страну</option>
                        <option value="turkey">Турция</option>
                        <option value="egypt">Египет</option>
                        <option value="uae">ОАЭ</option>
                        <option value="greece">Греция</option>
                        <option value="thailand">Тайланд</option>
                        <option value="spain">Испания</option>
                    </select>
                </div>
                <div class="form-group">
                    <div class="rating-input">
                        <input type="radio" id="star5" name="rating" value="5">
                        <label for="star5" title="Отлично"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star4" name="rating" value="4">
                        <label for="star4" title="Хорошо"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star3" name="rating" value="3">
                        <label for="star3" title="Удовлетворительно"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star2" name="rating" value="2">
                        <label for="star2" title="Плохо"><i class="fas fa-star"></i></label>
                        <input type="radio" id="star1" name="rating" value="1">
                        <label for="star1" title="Ужасно"><i class="fas fa-star"></i></label>
                    </div>
                </div>
                <div class="form-group">
                    <textarea class="modal-textarea" placeholder="Ваш отзыв..." required></textarea>
                </div>
                <button type="submit" class="modal-submit-btn">Отправить отзыв</button>
            </form>
        </div>
    `;

  document.body.appendChild(reviewModal);
}

// Открытие модального окна
if (addReviewBtn) {
  addReviewBtn.addEventListener("click", () => {
    reviewModal.classList.add("active");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px"; // Для компенсации скроллбара
  });
}

// Закрытие модального окна
const modalClose = reviewModal.querySelector(".modal-close");
modalClose.addEventListener("click", () => {
  closeModal();
});

// Закрытие модального окна при клике вне его
reviewModal.addEventListener("click", (e) => {
  if (e.target === reviewModal) {
    closeModal();
  }
});

// Закрытие модального окна при нажатии Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && reviewModal.classList.contains("active")) {
    closeModal();
  }
});

// Функция закрытия модального окна
function closeModal() {
  reviewModal.classList.remove("active");
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

// Обработка формы отзыва
const reviewForm = reviewModal.querySelector("#reviewForm");
if (reviewForm) {
  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Получаем значения из формы
    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const country = this.querySelector("select").value;
    const rating = this.querySelector('input[name="rating"]:checked');
    const comment = this.querySelector("textarea").value.trim();

    // Проверяем обязательные поля
    if (!name || !email || !country || !rating || !comment) {
      alert("Пожалуйста, заполните все поля формы!");
      return;
    }

    // В реальном приложении здесь была бы отправка на сервер
    console.log({
      name,
      email,
      country,
      rating: rating.value,
      comment,
    });

    alert(
      `Спасибо, ${name}! Ваш отзыв принят. После модерации он появится на сайте.`
    );

    // Закрываем модальное окно и сбрасываем форму
    closeModal();
    this.reset();

    // Сбрасываем рейтинг
    this.querySelectorAll('input[name="rating"]').forEach((radio) => {
      radio.checked = false;
    });
  });
}

// Инициализация рейтинга в модальном окне
function initRatingInput() {
  const ratingLabels = reviewModal.querySelectorAll(".rating-input label");

  ratingLabels.forEach((label) => {
    label.addEventListener("mouseenter", function () {
      const ratingValue = this.previousElementSibling.value;
      highlightStars(ratingValue);
    });

    label.addEventListener("mouseleave", function () {
      const checkedInput = reviewModal.querySelector(
        'input[name="rating"]:checked'
      );
      if (checkedInput) {
        highlightStars(checkedInput.value);
      } else {
        resetStars();
      }
    });

    label.addEventListener("click", function () {
      const input = this.previousElementSibling;
      if (input && input.type === "radio") {
        input.checked = true;
        highlightStars(input.value);
      }
    });
  });
}

// Подсветка звезд рейтинга
function highlightStars(ratingValue) {
  const stars = reviewModal.querySelectorAll(".rating-input label");
  stars.forEach((star, index) => {
    const starValue = 5 - index;
    if (starValue <= ratingValue) {
      star.style.color = "#f39c12";
    } else {
      star.style.color = "#ddd";
    }
  });
}

// Сброс подсветки звезд
function resetStars() {
  const stars = reviewModal.querySelectorAll(".rating-input label");
  stars.forEach((star) => {
    star.style.color = "#ddd";
  });
}

// Инициализация рейтинга после создания модального окна
setTimeout(() => {
  if (reviewModal) {
    initRatingInput();
  }
}, 100);
