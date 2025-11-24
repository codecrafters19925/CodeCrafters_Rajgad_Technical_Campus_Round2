import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-farmer.jpg";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Auth() {
  const { signIn, signUp, session, loading } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [tab, setTab] = useState("login");

  // Redirect if already authenticated
  if (session) {
    window.location.href = "/";
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!" });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signUp(email, password, fullName);
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "Confirm your email to finish signup." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Farmer Login | CropAI</title>
        <meta name="description" content="Secure login for farmers to access AI crop recommendations." />
        <link rel="canonical" href={`${window.location.origin}/auth`} />
      </Helmet>

      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"><span className="text-2xl">🌾</span></div>
          <span className="text-xl font-bold">CropAI</span>
        </div>
        <LanguageSwitcher />
      </header>

      <main className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <article className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h1 className="text-3xl font-bold mb-2">{t("auth.welcome")}</h1>
          <p className="text-muted-foreground mb-6">{t("auth.tagline")}</p>

          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="login">{t("auth.signIn")}</TabsTrigger>
              <TabsTrigger value="signup">{t("auth.signUp")}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>{t("auth.signIn")}</Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="fullName">{t("auth.fullName")}</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="email2">{t("auth.email")}</Label>
                  <Input id="email2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="password2">{t("auth.password")}</Label>
                  <Input id="password2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>{t("auth.signUp")}</Button>
              </form>
            </TabsContent>
          </Tabs>
        </article>

        <aside className="relative overflow-hidden rounded-xl">
          <img src={heroImage} alt="Farmer using mobile in field" className="w-full h-[520px] object-cover rounded-xl" loading="lazy" />
        </aside>
      </main>
    </div>
  );
}
