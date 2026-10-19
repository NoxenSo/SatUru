import { useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';
import { Project, Message } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { MessageSquare, Send, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

export function MessagesPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api
      .get<{ projects: Project[] }>('/projects')
      .then(({ projects }) => {
        setProjects(projects);
        if (projects.length > 0) setSelectedProject(projects[0]);
      })
      .catch(() => {})
      .finally(() => setLoadingProjects(false));
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    setLoadingMessages(true);
    setMessages([]);
    api
      .get<{ messages: Message[] }>(`/projects/${selectedProject.id}/messages`)
      .then(({ messages }) => setMessages(messages))
      .catch(() => {})
      .finally(() => setLoadingMessages(false));
  }, [selectedProject]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!draft.trim() || !selectedProject || sending) return;
    const content = draft.trim();
    setDraft('');
    setSending(true);
    try {
      const { message } = await api.post<{ message: Message }>(
        `/projects/${selectedProject.id}/messages`,
        { content },
      );
      setMessages((prev) => [...prev, message]);
    } catch {
      setDraft(content); // restore on error
    } finally {
      setSending(false);
    }
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="max-w-5xl h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-1 font-mono tracking-widest uppercase">
          Portal
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight">Messages</h1>
      </div>

      {loadingProjects ? (
        <div className="flex gap-4 flex-1">
          <Skeleton className="w-64 rounded-xl" />
          <Skeleton className="flex-1 rounded-xl" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FolderOpen className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
            <p className="font-medium mb-1">No projects yet</p>
            <p className="text-sm text-muted-foreground">
              Create a project first to start messaging.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex gap-4 flex-1 min-h-0">
          {/* Project list */}
          <div className="w-56 shrink-0 flex flex-col gap-1.5 overflow-y-auto">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-150',
                  selectedProject?.id === p.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                )}
              >
                <p className="truncate font-medium">{p.title}</p>
                <p className={cn('text-xs truncate mt-0.5', selectedProject?.id === p.id ? 'text-primary/70' : 'text-muted-foreground/60')}>
                  {p.status.charAt(0) + p.status.slice(1).toLowerCase()}
                </p>
              </button>
            ))}
          </div>

          {/* Message thread */}
          <div className="flex-1 flex flex-col rounded-xl border border-border/40 bg-card/20 overflow-hidden">
            {/* Thread header */}
            {selectedProject && (
              <div className="px-5 py-4 border-b border-border/40">
                <p className="font-semibold text-sm">{selectedProject.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Conversation with SatUru Studio
                </p>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {loadingMessages ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className={cn('h-12 rounded-xl', i % 2 === 0 ? 'ml-16' : 'mr-16')} />
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center h-full text-center">
                  <div>
                    <MessageSquare className="mx-auto mb-3 h-10 w-10 text-muted-foreground/20" />
                    <p className="text-sm text-muted-foreground">
                      No messages yet. Say hello!
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => {
                  const isClient = msg.sender === 'CLIENT';
                  const showDate =
                    i === 0 ||
                    formatDate(messages[i - 1].createdAt) !== formatDate(msg.createdAt);

                  return (
                    <div key={msg.id}>
                      {showDate && (
                        <div className="text-center my-2">
                          <span className="text-xs text-muted-foreground/50 bg-muted/30 px-3 py-1 rounded-full">
                            {formatDate(msg.createdAt)}
                          </span>
                        </div>
                      )}
                      <div className={cn('flex gap-2', isClient ? 'justify-end' : 'justify-start')}>
                        <div
                          className={cn(
                            'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                            isClient
                              ? 'bg-primary text-primary-foreground rounded-br-sm'
                              : 'bg-muted/60 text-foreground rounded-bl-sm',
                          )}
                        >
                          <p>{msg.content}</p>
                          <p
                            className={cn(
                              'text-[10px] mt-1',
                              isClient ? 'text-primary-foreground/60 text-right' : 'text-muted-foreground',
                            )}
                          >
                            {formatTime(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/40">
              <div className="flex gap-3 items-end">
                <Textarea
                  placeholder="Write a message…"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  className="resize-none"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!draft.trim() || sending}
                  className="shrink-0"
                >
                  <Send size={16} />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground/40 mt-1.5 pl-1">
                Enter to send · Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
