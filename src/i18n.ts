import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      app: { name: "CropAI" },
      nav: {
        home: "Home",
        features: "Features",
        benefits: "Benefits",
        howItWorks: "How It Works",
        tryCropSuggestion: "Try Crop Suggestion",
        login: "Login",
        logout: "Logout",
        language: "Language"
      },
      hero: {
        badge: "AI-Powered Agriculture",
        title1: "Smart Crop Recommendations for",
        title2: " Modern Farmers",
        subtitle:
          "Maximize your harvest with AI-driven insights. Get personalized crop recommendations based on soil health, weather patterns, and market trends.",
        startTrial: "Start Free Trial",
        watchDemo: "Watch Demo",
        stats: { accuracy: "Accuracy Rate", farmers: "Active Farmers", yield: "Yield Increase" }
      },
      auth: {
        titleLogin: "Farmer Login",
        titleSignup: "Create your account",
        email: "Email",
        password: "Password",
        fullName: "Full name",
        signIn: "Sign In",
        signUp: "Sign Up",
        noAccount: "Don't have an account?",
        haveAccount: "Already have an account?",
        or: "or",
        welcome: "Welcome to CropAI",
        tagline: "Grow more with data-driven decisions"
      },
      trial: {
        title: "Free 14‑day Trial",
        desc: "Explore all features with no credit card required.",
        point1: "Unlimited crop recommendations",
        point2: "Weather insights for your location",
        point3: "Cancel anytime",
        start: "Start Now"
      },
      demo: {
        title: "How CropAI Works",
        step1: "Enter your farm location (or use current location)",
        step2: "We fetch last month + next month weather",
        step3: "AI suggests best crops, yield and irrigation plan",
        benefits: "Higher yield, lower risk, smarter inputs"
      }
    }
  },
  hi: { translation: { nav: { home: "होम", features: "विशेषताएँ", benefits: "लाभ", howItWorks: "कैसे काम करता है", tryCropSuggestion: "फ़सल सुझाव आज़माएँ", login: "लॉगिन", logout: "लॉगआउट" }, hero: { badge: "एआई संचालित कृषि", title1: "स्मार्ट फ़सल सिफ़ारिशें", title2: " आधुनिक किसानों के लिए", subtitle: "एआई‑आधारित जानकारियों से अपनी पैदावार बढ़ाएँ.", startTrial: "मुफ़्त ट्रायल शुरू करें", watchDemo: "डेमो देखें", stats: { accuracy: "सटीकता", farmers: "सक्रिय किसान", yield: "पैदावार वृद्धि" } }, auth: { titleLogin: "किसान लॉगिन", titleSignup: "खाता बनाएँ", email: "ईमेल", password: "पासवर्ड", fullName: "पूरा नाम", signIn: "लॉगिन", signUp: "साइन अप" }, trial: { title: "14 दिन का मुफ़्त ट्रायल", desc: "क्रेडिट कार्ड की ज़रूरत नहीं.", point1: "अनलिमिटेड फ़सल सुझाव", point2: "मौसम जानकारी", point3: "कभी भी रद्द करें", start: "अभी शुरू करें" }, demo: { title: "CropAI कैसे काम करता है", step1: "अपना स्थान डालें", step2: "पिछला/अगला महीना मौसम", step3: "एआई फ़सल व सिंचाई योजना देता है", benefits: "ज़्यादा पैदावार, कम जोखिम" } } },
  mr: { translation: { nav: { home: "मुख्यपृष्ठ", features: "वैशिष्ट्य", benefits: "फायदे", howItWorks: "कसे कार्य करते", tryCropSuggestion: "पीक सूचना वापरा", login: "लॉगिन", logout: "लॉगआऊट" }, hero: { badge: "एआय‑चालित शेती", title1: "स्मार्ट पीक शिफारसी", title2: " आधुनिक शेतकऱ्यांसाठी", subtitle: "एआयच्या मदतीने उत्पन्न वाढवा.", startTrial: "मोफत चाचणी सुरू करा", watchDemo: "डेमो पाहा", stats: { accuracy: "अचूकता", farmers: "सक्रिय शेतकरी", yield: "उत्पन्न वाढ" } }, auth: { titleLogin: "शेतकरी लॉगिन", titleSignup: "खाते तयार करा", email: "ईमेल", password: "पासवर्ड", fullName: "पूर्ण नाव", signIn: "लॉगिन", signUp: "साइन अप" } } },
  kn: { translation: { nav: { home: "ಮುಖಪುಟ", features: "ವೈಶಿಷ್ಟ್ಯಗಳು", benefits: "ಲಾಭಗಳು", howItWorks: "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", tryCropSuggestion: "ಬೆಳೆ ಸಲಹೆ ಪ್ರಯತ್ನಿಸಿ", login: "ಲಾಗಿನ್", logout: "ಲಾಗೌಟ್" } } },
  te: { translation: { nav: { home: "హోమ్", features: "లక్షణాలు", benefits: "లాభాలు", howItWorks: "ఎలా పనిచేస్తుంది", tryCropSuggestion: "పంట సూచన ప్రయత్నించండి", login: "లాగిన్", logout: "లాగౌట్" } } },
  pa: { translation: { nav: { home: "ਹੋਮ", features: "ਖਾਸੀਤਾਂ", benefits: "ਫਾਇਦੇ", howItWorks: "ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ", tryCropSuggestion: "ਫਸਲ ਸੁਝਾਅ", login: "ਲਾਗਇਨ", logout: "ਲਾੱਗਆਊਟ" } } },
  bn: { translation: { nav: { home: "হোম", features: "বৈশিষ্ট্য", benefits: "সুবিধা", howItWorks: "কিভাবে কাজ করে", tryCropSuggestion: "ফসল পরামর্শ", login: "লগইন", logout: "লগআউট" } } },
  gu: { translation: { nav: { home: "મુખપૃષ્ઠ", features: "વિશેષતાઓ", benefits: "લાભ", howItWorks: "કેવી રીતે કામ કરે", tryCropSuggestion: "પાક સૂચન", login: "લૉગિન", logout: "લૉગઆઉટ" } } },
  ur: { translation: { nav: { home: "ہوم", features: "خصوصیات", benefits: "فوائد", howItWorks: "کیسے کام کرتا ہے", tryCropSuggestion: "فصل کی تجویز", login: "لاگ ان", logout: "لاگ آؤٹ" } } },
  fa: { translation: { nav: { home: "خانه", features: "ویژگی‌ها", benefits: "مزایا", howItWorks: "چگونه کار می‌کند", tryCropSuggestion: "پیشنهاد کشت", login: "ورود", logout: "خروج" } } },
  ml: { translation: { nav: { home: "ഹോം", features: "സവിശേഷതകൾ", benefits: "ലാഭങ്ങൾ", howItWorks: "എങ്ങനെ പ്രവർത്തിക്കുന്നു", tryCropSuggestion: "വിള ശുപാർശ", login: "ലോഗിൻ", logout: "ലോഗ്ഔട്ട്" } } },
  ta: { translation: { nav: { home: "முகப்பு", features: "அம்சங்கள்", benefits: "நன்மைகள்", howItWorks: "எப்படி வேலை", tryCropSuggestion: "பயிர் பரிந்துரை", login: "உள்நுழை", logout: "வெளியேறு" } } }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
