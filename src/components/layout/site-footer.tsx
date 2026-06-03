import Link from "next/link";
import { ExternalLink, Mail, Compass, Send, Star, Sparkles, Heart } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      {/* 渐变装饰线 */}
      <div className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 品牌 */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="text-2xl">💼</span>
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                副业宝典
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              帮助每个人找到适合自己的副业之路。汇聚真实副业案例，提供详细的入门指南和实操建议。
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
              <a
                href="mailto:admin@fuye.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="邮箱"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">快速链接</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/sidehustles"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Compass className="h-4 w-4" />
                  浏览副业
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  分享副业
                </Link>
              </li>
              <li>
                <Link
                  href="/sidehustles?sortBy=rating"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Star className="h-4 w-4" />
                  高分推荐
                </Link>
              </li>
              <li>
                <Link
                  href="/sidehustles?difficulty=入门"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  新手入门
                </Link>
              </li>
            </ul>
          </div>

          {/* 免责声明 */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">声明</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              本站内容仅供参考，收入数据为分享者个人经验，实际收益因个人能力、投入时间和市场环境而异。投资有风险，选择需谨慎。
            </p>
          </div>

          {/* 关注我们 */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">关注我们</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-lg">📱</span> 微信公众号：副业宝典
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">📮</span> 邮箱：admin@fuye.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">🌐</span> 网址：fuye.example.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            © {currentYear} 副业宝典 - 发现适合你的副业之路
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline" />
          </span>
        </div>
      </div>
    </footer>
  );
}
