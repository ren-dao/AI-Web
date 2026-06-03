"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CATEGORIES, DIFFICULTY_LEVELS } from "@/lib/constants";
import { Plus, X, Send, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

function DynamicInputList({
  label,
  values,
  onChange,
  placeholder = "添加一项",
}: {
  label: string;
  values: string[];
  onChange: (vals: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onChange([...values, input.trim()]);
      setInput("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {values.map((val, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-sm"
            >
              {val}
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-9"
        />
        <Button type="button" size="icon" variant="outline" onClick={handleAdd} className="h-9 w-9 shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function ResourceLinkList({
  values,
  onChange,
}: {
  values: { title: string; url: string }[];
  onChange: (vals: { title: string; url: string }[]) => void;
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = () => {
    if (title.trim() && url.trim()) {
      onChange([...values, { title: title.trim(), url: url.trim() }]);
      setTitle("");
      setUrl("");
    }
  };

  return (
    <div className="space-y-2">
      <Label>资源链接</Label>
      {values.length > 0 && (
        <div className="space-y-2 mb-2">
          {values.map((link, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="font-medium">{link.title}</span>
              <span className="text-muted-foreground truncate">{link.url}</span>
              <button
                type="button"
                onClick={() => onChange(values.filter((_, j) => j !== i))}
                className="text-muted-foreground hover:text-destructive shrink-0"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="资源名称"
          className="h-9 flex-1"
        />
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL 地址"
          className="h-9 flex-1"
        />
        <Button type="button" size="icon" variant="outline" onClick={handleAdd} className="h-9 w-9">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function SubmitPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // 表单数据
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [timeInvestment, setTimeInvestment] = useState("");
  const [incomeMin, setIncomeMin] = useState("");
  const [incomeMax, setIncomeMax] = useState("");
  const [startupCost, setStartupCost] = useState("");
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [toolsResources, setToolsResources] = useState<string[]>([]);
  const [stepsToStart, setStepsToStart] = useState<string[]>([]);
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const [tipsForSuccess, setTipsForSuccess] = useState<string[]>([]);
  const [resourceLinks, setResourceLinks] = useState<{ title: string; url: string }[]>([]);
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 基础校验
    if (!title || !category || !description || !fullDescription || !difficulty ||
        !timeInvestment || !incomeMin || !incomeMax || !startupCost || !submitterName) {
      toast.error("请填写所有必填字段");
      return;
    }

    if (parseInt(incomeMax) < parseInt(incomeMin)) {
      toast.error("最高收入不能低于最低收入");
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        title,
        category,
        description,
        fullDescription,
        difficulty,
        timeInvestment,
        incomeMin: parseInt(incomeMin),
        incomeMax: parseInt(incomeMax),
        startupCost,
        requiredSkills: JSON.stringify(requiredSkills),
        toolsResources: JSON.stringify(toolsResources),
        stepsToStart: JSON.stringify(stepsToStart),
        pros: JSON.stringify(pros),
        cons: JSON.stringify(cons),
        tipsForSuccess: JSON.stringify(tipsForSuccess),
        resourceLinks: JSON.stringify(resourceLinks),
        coverImage: coverImage || null,
        submitterName,
        submitterEmail: submitterEmail || null,
      };

      const res = await fetch("/api/sidehustles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success("副业分享成功！感谢你的贡献 🎉");
        router.push("/submit/success");
      } else {
        const err = await res.json();
        if (err.details) {
          toast.error(err.details[0]?.message || "提交失败");
        } else {
          toast.error(err.error || "提交失败，请重试");
        }
      }
    } catch {
      toast.error("网络错误，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-black font-heading mb-2">分享你的副业经验</h1>
        <p className="text-muted-foreground">
          填写以下信息，帮助更多人找到适合的副业方向
        </p>
      </div>

      {/* 步骤指示器 */}
      <div className="flex items-center justify-between mb-8 px-2">
        {[
          { num: 1, label: "基本信息" },
          { num: 2, label: "收益投入" },
          { num: 3, label: "入门要求" },
          { num: 4, label: "评价经验" },
          { num: 5, label: "你的信息" },
        ].map((step, i, arr) => (
          <div key={step.num} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold border-2 border-primary/20">
                {step.num}
              </div>
              <span className="text-[10px] text-muted-foreground text-center hidden sm:block">
                {step.label}
              </span>
            </div>
            {i < arr.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 bg-gradient-to-r from-primary/20 to-muted" />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 第一部分：基本信息 */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">1. 📋 基本信息</h2>
            <div className="space-y-2">
              <Label htmlFor="title">标题 *</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例如：微信公众号写作" maxLength={100} required />
            </div>
            <div className="space-y-2">
              <Label>分类 *</Label>
              <Select value={category} onValueChange={(v) => setCategory(v || "")}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">简短描述 *（10-300字）</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="用一段话概括这个副业..." rows={2} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullDescription">详细介绍 *（支持Markdown格式）</Label>
              <Textarea id="fullDescription" value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} placeholder={`详细介绍这个副业，包括：\n- 为什么选择这个副业\n- 具体操作方法\n- 变现方式\n- 注意事项\n\n支持 Markdown 格式排版...`} rows={8} required />
            </div>
            <div className="space-y-2">
              <Label>难度等级 *</Label>
              <div className="flex gap-3">
                {DIFFICULTY_LEVELS.map((d) => (
                  <Button
                    key={d.value}
                    type="button"
                    variant={difficulty === d.value ? "default" : "outline"}
                    onClick={() => setDifficulty(d.value)}
                    className="flex-1"
                  >
                    {d.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImage">封面图URL</Label>
              <Input id="coverImage" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://...（可选，推荐 800x400 尺寸）" type="url" />
              {coverImage && (
                <img src={coverImage} alt="预览" className="h-32 rounded-lg object-cover mt-2" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* 第二部分：收益与投入 */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">2. 💰 收益与投入</h2>
            <div className="space-y-2">
              <Label htmlFor="timeInvestment">时间投入 *</Label>
              <Input id="timeInvestment" value={timeInvestment} onChange={(e) => setTimeInvestment(e.target.value)} placeholder="例如：10-20 小时/周" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="incomeMin">月最低收入 (元) *</Label>
                <Input id="incomeMin" type="number" value={incomeMin} onChange={(e) => setIncomeMin(e.target.value)} placeholder="0" min="0" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="incomeMax">月最高收入 (元) *</Label>
                <Input id="incomeMax" type="number" value={incomeMax} onChange={(e) => setIncomeMax(e.target.value)} placeholder="10000" min="0" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startupCost">启动成本 *</Label>
              <Input id="startupCost" value={startupCost} onChange={(e) => setStartupCost(e.target.value)} placeholder="例如：0-500元" required />
            </div>
          </CardContent>
        </Card>

        {/* 第三部分：入门要求 */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">3. 🔧 入门要求</h2>
            <DynamicInputList label="所需技能" values={requiredSkills} onChange={setRequiredSkills} placeholder="例如：写作能力" />
            <DynamicInputList label="所需工具/资源" values={toolsResources} onChange={setToolsResources} placeholder="例如：电脑、Canva" />
            <DynamicInputList label="入门步骤" values={stepsToStart} onChange={setStepsToStart} placeholder="例如：注册账号并完善资料" />
          </CardContent>
        </Card>

        {/* 第四部分：评价与资源 */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">4. 📝 评价与经验</h2>
            <DynamicInputList label="优点" values={pros} onChange={setPros} placeholder="例如：门槛低、时间自由" />
            <DynamicInputList label="缺点/挑战" values={cons} onChange={setCons} placeholder="例如：竞争激烈" />
            <DynamicInputList label="成功贴士" values={tipsForSuccess} onChange={setTipsForSuccess} placeholder="例如：选择垂直领域深耕" />
            <ResourceLinkList values={resourceLinks} onChange={setResourceLinks} />
          </CardContent>
        </Card>

        {/* 第五部分：你的信息 */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">5. 👤 你的信息</h2>
            <div className="space-y-2">
              <Label htmlFor="submitterName">你的名字 *</Label>
              <Input id="submitterName" value={submitterName} onChange={(e) => setSubmitterName(e.target.value)} placeholder="让大家都知道你的贡献" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="submitterEmail">邮箱（可选）</Label>
              <Input id="submitterEmail" type="email" value={submitterEmail} onChange={(e) => setSubmitterEmail(e.target.value)} placeholder="不会公开展示" />
            </div>
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 sticky bottom-4 bg-card/95 backdrop-blur-sm p-4 border border-primary/10 rounded-lg shadow-lg">
          <Button type="submit" size="lg" className="flex-1 gap-2" disabled={submitting}>
            <Send className="h-5 w-5" />
            {submitting ? "提交中..." : "提交分享"}
          </Button>
          <Button type="button" size="lg" variant="outline" className="flex-1"
            onClick={() => {
              if (confirm("确定要清空所有已填写的内容吗？")) {
                window.location.reload();
              }
            }}
          >
            清空重填
          </Button>
        </div>
      </form>
    </div>
  );
}
