"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CommentForm } from "@/components/comment/comment-form";
import { formatRelativeTime } from "@/lib/format";
import { Reply, ChevronDown } from "lucide-react";
import type { CommentData } from "@/types";

interface CommentItemProps {
  comment: CommentData;
  sideHustleId: string;
  onRefresh: () => void;
}

export function CommentItem({ comment, sideHustleId, onRefresh }: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);

  return (
    <div className="group">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-sm">
            {comment.authorName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.authorName}</span>
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-2">{comment.content}</p>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"
            onClick={() => setShowReply(!showReply)}
          >
            <Reply className="h-3 w-3" />
            回复
          </Button>

          {showReply && (
            <div className="mt-3 ml-2 pl-3 border-l-2 border-muted">
              <CommentForm
                sideHustleId={sideHustleId}
                parentId={comment.id}
                placeholder={`回复 ${comment.authorName}...`}
                buttonText="回复"
                onSuccess={() => {
                  setShowReply(false);
                  onRefresh();
                }}
              />
            </div>
          )}

          {/* 嵌套回复 */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-4 mt-3 space-y-3 border-l-2 border-muted pl-4">
              {(showAllReplies ? comment.replies : comment.replies.slice(0, 3)).map((reply) => (
                <div key={reply.id} className="flex gap-2">
                  <Avatar className="h-6 w-6 shrink-0">
                    <AvatarFallback className="bg-muted text-xs">
                      {reply.authorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xs">{reply.authorName}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatRelativeTime(reply.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5">{reply.content}</p>
                  </div>
                </div>
              ))}
              {comment.replies.length > 3 && !showAllReplies && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs gap-1 text-muted-foreground"
                  onClick={() => setShowAllReplies(true)}
                >
                  <ChevronDown className="h-3 w-3" />
                  查看全部 {comment.replies.length} 条回复
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
