document.addEventListener('DOMContentLoaded', () => {
  // Просто запускаем — всё остальное (URL и Grid) сделает common.js
  if (window.projectFilter) {
      window.projectFilter.init();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (window.newsFilter) {
      window.newsFilter.init();
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');
  let lastScrollY = window.scrollY;

  if (header) {
      // 1. Сразу делаем хедер белым
      header.classList.add('header-static-light');

      // 2. Логика пряток при скролле
      window.addEventListener('scroll', () => {
          const currentScrollY = window.scrollY;

          // Если скроллим вниз и ушли ниже 50px — прячем
          if (currentScrollY > lastScrollY && currentScrollY > 50) {
              header.classList.add('header-hidden');
          } 
          // Если скроллим вверх — показываем
          else if (currentScrollY < lastScrollY) {
              header.classList.remove('header-hidden');
          }

          lastScrollY = currentScrollY;
      }, { passive: true });
  }
});

function initAutoWidthSelects() {
  const wrappers = document.querySelectorAll('.select-wrapper');
  
  if (wrappers.length === 0) console.warn("Селекты не найдены!");

  wrappers.forEach(wrapper => {
    const select = wrapper.querySelector('select');
    const resizer = wrapper.querySelector('.select-resizer');

    if (!select || !resizer) return;

    function updateWidth() {
      const selectedText = select.options[select.selectedIndex].text;
      resizer.textContent = selectedText;
      
      // Замеряем ширину текста + запас под паддинги и стрелку
      const newWidth = resizer.offsetWidth + 95; 
      
      console.log(`Ширина для "${selectedText}": ${newWidth}px`);
      
      wrapper.style.setProperty('width', `${newWidth}px`, 'important');
    }

    select.addEventListener('change', updateWidth);
  });

  const resetBtn = document.getElementById('reset-filters-btn');

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    const wrappers = document.querySelectorAll('.select-wrapper');
    wrappers.forEach(wrapper => {
      // Возвращаем стартовую ширину (как в CSS)
      wrapper.style.width = '140px'; 
      
      // На всякий случай сбрасываем текст в ресайзере
      const resizer = wrapper.querySelector('.select-resizer');
      if (resizer) resizer.textContent = '';
    });
  });
}
}

// Запуск
document.addEventListener('DOMContentLoaded', initAutoWidthSelects);


