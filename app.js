const defaultProfile = {
  name: "Nom du profil",
  description: "Votre présence digitale en un seul lien",

  profileImage: "assets/profile-demo.svg",
  coverImage: "assets/cover-demo.svg",

  instagram: "",
  facebook: "",
  tiktok: "",

  phone: "",
  whatsapp: "",
  googleMaps: ""
};


// قراءة ID الزبون من الرابط
const params = new URLSearchParams(window.location.search);

const profileId = params.get("id") || "demo";


// تحميل بيانات الزبون
async function loadProfile() {

  try {

    const response = await fetch(
      `profiles/${profileId}.json`
    );

    if (!response.ok) {
      throw new Error("Profile not found");
    }

    const profile = await response.json();

    displayProfile(profile);

  } catch (error) {

    console.log(error);

    displayProfile(defaultProfile);

  }

}


// عرض بيانات الزبون
function displayProfile(profile) {

  // الاسم
  document.getElementById("name").textContent =
    profile.name || defaultProfile.name;


  // الوصف
  document.getElementById("description").textContent =
    profile.description || "";


  // صورة البروفايل
  document.getElementById("profileImage").src =
    profile.profileImage || defaultProfile.profileImage;


  // صورة الغلاف
  document.getElementById("coverImage").src =
    profile.coverImage || defaultProfile.coverImage;


  // عنوان الصفحة
  document.title =
    profile.name || "TapTapCard";


  // روابط السوشيال
  createSocialLinks(profile);


  // الهاتف والواتساب
  createContactButtons(profile);

}


// إنشاء روابط Instagram / Facebook / TikTok
function createSocialLinks(profile) {

  const container =
    document.getElementById("socialLinks");

  container.innerHTML = "";


  const socialNetworks = [

    {
      name: "Instagram",
      icon: "◎",
      url: profile.instagram
    },

    {
      name: "Facebook",
      icon: "f",
      url: profile.facebook
    },

    {
      name: "TikTok",
      icon: "♪",
      url: profile.tiktok
    }

  ];


  socialNetworks.forEach(network => {

    if (!network.url) {
      return;
    }


    const link =
      document.createElement("a");

    link.className = "social-link";

    link.href = network.url;

    link.target = "_blank";

    link.rel = "noopener noreferrer";


    link.innerHTML = `

      <span class="social-icon">
        ${network.icon}
      </span>

      <span class="social-name">
        ${network.name}
      </span>

    `;


    container.appendChild(link);

  });

}


// إنشاء أزرار الهاتف والواتساب
function createContactButtons(profile) {

  const phoneButton =
    document.getElementById("phoneButton");

  const whatsappButton =
    document.getElementById("whatsappButton");


  // الهاتف
  if (profile.phone) {

    phoneButton.href =
      `tel:${profile.phone}`;

  } else {

    phoneButton.style.display = "none";

  }


  // واتساب
  if (profile.whatsapp) {

    const number =
      profile.whatsapp.replace(/\D/g, "");

    whatsappButton.href =
      `https://wa.me/${number}`;

  } else {

    whatsappButton.style.display = "none";

  }

}


// تشغيل الموقع
loadProfile();
