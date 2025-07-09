// Minimal translation handling
const translations = {
  ar: { heading: "رحلتك تبدأ هنا", btnRequest: "اطلب الآن", footer: "© 2025 عالطريق. جميع الحقوق محفوظة." },
  en: { heading: "Your journey starts here", btnRequest: "Book Now", footer: "© 2025 AlaTariq. All rights reserved." },
  he: { heading: "המסע שלך מתחיל כאן", btnRequest: "הזמן עכשיו", footer: "© 2025 על־הדרך. כל הזכויות שמורות." }
};

function switchLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ar" || lang === "he") ? "rtl" : "ltr";
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
}

function openModal() {
  document.getElementById("booking-modal").style.display = "block";
}
function closeModal() {
  document.getElementById("booking-modal").style.display = "none";
}

document.getElementById("booking-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const pickup = this.querySelectorAll("input")[0].value.trim();
  const destination = this.querySelectorAll("input")[1].value.trim();
  const rideType = this.querySelector("select").value;
  const phone = localStorage.getItem("loggedInPhone");
  if (!phone) return alert("يرجى تسجيل الدخول أولاً");
  if (!pickup || !destination || !rideType) return alert("يرجى ملء جميع الحقول");
  const res = await fetch("/log-ride", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, pickup, destination, rideType })
  });
  const data = await res.json();
  if (res.ok) {
    alert("تم الحجز بنجاح!");
    closeModal();
  } else {
    alert(data.message || "فشل في الحجز");
  }
});

switchLang("ar");
