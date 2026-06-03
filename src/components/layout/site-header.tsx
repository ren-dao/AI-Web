"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchCommand } from "@/components/layout/search-command";
import { cn } from "@/lib/utils";
import { Menu, Search, PlusCircle, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/sidehustles", label: "浏览副业" },
  { href: "/submit", label: "提交副业" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
          <span className="text-2xl">💼</span>
          <span className="hidden sm:inline bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            副业宝典
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={pathname === link.href ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "text-sm",
                  pathname === link.href && "bg-primary text-primary-foreground"
                )}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearchOpen(true)}
            className="gap-2 text-muted-foreground"
          >
            <Search className="h-4 w-4" />
            <span>搜索副业...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-4">
              Ctrl+K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground"
            aria-label="切换主题"
          >
            {mounted ? (
              theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Link href="/submit">
            <Button size="sm" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              分享副业
            </Button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-4" onClick={() => setMobileOpen(false)}>
                  <span className="text-2xl">💼</span>
                  副业宝典
                </Link>
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                    <Button
                      variant={pathname === link.href ? "default" : "ghost"}
                      className="w-full justify-start text-base"
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <Link href="/submit" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full gap-2 mt-2">
                    <PlusCircle className="h-4 w-4" />
                    分享副业
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {mounted ? (
                    theme === "dark" ? (
                      <><Sun className="h-4 w-4" /> 切换亮色模式</>
                    ) : (
                      <><Moon className="h-4 w-4" /> 切换暗色模式</>
                    )
                  ) : (
                    <><Sun className="h-4 w-4" /> 切换主题</>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
      </div>
    </header>
  );
}
