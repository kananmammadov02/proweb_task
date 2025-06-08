const openMenu = document.querySelector(".open_menu");
const menu = document.querySelector(".nav_links");
openMenu.addEventListener("click", function () {
  menu.classList.toggle("active");
  openMenu.classList.toggle("active");
});
const langBtn = document.querySelector(".lang_btn");
const langDropdown = document.querySelector(".language_dropdown");
langBtn.addEventListener("click", function () {
  langDropdown.classList.toggle("active");
});
const dropdownItems = document.querySelectorAll(".language_dropdown li");
const langSpan = document.querySelector(".lang_btn span");
dropdownItems.forEach((item) => {
  item.addEventListener("click", () => {
    langSpan.textContent = item.textContent;
    langDropdown.classList.remove('active')
  });
});
fetch("./assets/vendors/db/db.json")
  .then((res) => res.json())
  .then(draw)
  .catch(console.error);

function draw(data) {
  data.items.forEach((item) => {
    const wrap = document.getElementById(item.id);
    if (!wrap) return;
    const computedStyle = getComputedStyle(wrap);
    const isMobile = window.matchMedia("(max-width: 992px)").matches;
    const size = parseFloat(
      computedStyle.getPropertyValue(
        isMobile ? "--data-mobile-sizes" : "--data-desktop-sizes"
      )
    );
    const r = size / 2;
    const cx = wrap.offsetLeft + wrap.offsetWidth / 2;
    const cy = wrap.offsetTop + wrap.offsetHeight / 2;
    const companies = item.elements;
    const step = (2 * Math.PI) / companies.length;
    companies.forEach((company, i) => {
      const angle = i * step;
      const x = cx + r * Math.cos(angle) - 50;
      const y = cy + r * Math.sin(angle) - 50;
      const el = document.createElement("div");
      el.className = "reference_company";
      el.style.position = "absolute";
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.dataset.companyId = company.id;

      el.innerHTML = `
        ${
          company.logo
            ? `<img src="${company.logo}" alt="${company.name}" class="company_logo">`
            : ""
        }
      `;
      el.addEventListener("click", () => {
        showEmployeeInfo(company);

      });

      wrap.appendChild(el);

      
    });
  });
}

function showEmployeeInfo(company) {
  const employeInfoCard = document.querySelector(".references_left_card");
  if (!employeInfoCard) return;
  employeInfoCard.innerHTML = `
    <div class="card_mark">‘’</div>
    <p class="card_content">${company.comment}</p>
    <h3 class="reference_card_title">${company.employee}</h3>
    <p class="reference_card_position">${company.position}, ${company.name}</p>
  `;
}
