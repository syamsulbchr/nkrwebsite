const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const inquiryForms = document.querySelectorAll("[data-inquiry-form]");
inquiryForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Inquiry NKR - ${data.get("topic") || "Produk"}`);
    const body = encodeURIComponent(
      [
        `Nama: ${data.get("name") || ""}`,
        `Institusi: ${data.get("company") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Telepon: ${data.get("phone") || ""}`,
        `Topik: ${data.get("topic") || ""}`,
        "",
        data.get("message") || "",
      ].join("\n")
    );
    window.location.href = `mailto:nusaraya_nr@yahoo.co.id?subject=${subject}&body=${body}`;
  });
});

const productParam = new URLSearchParams(window.location.search).get("produk");
const messageField = document.querySelector("[data-message]");
if (productParam && messageField) {
  messageField.value = `Saya ingin meminta penawaran untuk produk: ${productParam}`;
}
