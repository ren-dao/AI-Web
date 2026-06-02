import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* 品牌 */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="text-2xl">💼</span>
              副业宝典
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              帮助每个人找到适合自己的副业之路。汇聚真实副业案例，提供详细的入门指南和实操建议。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="font-semibold mb-3">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sidehustles" className="text-muted-foreground hover:text-foreground transition-colors">
                  浏览副业
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                  分享副业
                </Link>
              </li>
              <li>
                <Link href="/sidehustles?sortBy=rating" className="text-muted-foreground hover:text-foreground transition-colors">
                  高分推荐
                </Link>
              </li>
              <li>
                <Link href="/sidehustles?difficulty=入门" className="text-muted-foreground hover:text-foreground transition-colors">
                  新手入门
                </Link>
              </li>
            </ul>
          </div>

          {/* 免责声明 */}
          <div>
            <h4 className="font-semibold mb-3">声明</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              本站内容仅供参考，收入数据为分享者个人经验，实际收益因个人能力、投入时间和市场环境而异。投资有风险，选择需谨慎。
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} 副业宝典 - 发现适合你的副业之路
        </div>
      </div>
    </footer>
  );
}
