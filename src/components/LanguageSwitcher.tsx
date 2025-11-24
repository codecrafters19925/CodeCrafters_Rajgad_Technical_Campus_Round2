import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languages: Record<string, string> = {
  en: "English",
  mr: "Marathi",
  hi: "Hindi",
  kn: "Kannada",
  te: "Telugu",
  pa: "Punjabi",
  bn: "Bangla",
  gu: "Gujarati",
  ur: "Urdu",
  fa: "Parsi",
  ml: "Malayalam",
  ta: "Tamil"
};

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();

  return (
    <Select value={i18n.language} onValueChange={(lng) => i18n.changeLanguage(lng)}>
      <SelectTrigger className={compact ? "h-8 w-[140px]" : "w-[180px]"} aria-label="Language selector">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([code, name]) => (
          <SelectItem key={code} value={code} aria-label={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
