import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { Project, STATUS_LABELS, STATUS_COLORS } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { FolderOpen, MessageSquare, ArrowRight, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  trend?: string;
}) {
  return (
    <motion.div
      className="group relative rounded-2xl border border-border/40 bg-card/50 p-6 overflow-hidden transition-all duration-300"
      whileHover={{ y: -2, boxShadow: '0 8px 32px -8px hsl(258 90% 66% / 0.15)' }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

      <div className="relative flex items-start justify-between mb-5">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
          <Icon size={18} className="text-primary/80" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
            <TrendingUp size={10} />
            {trend}
          </span>
        )}
      </div>
      <p className="font-heading text-[2.4rem] font-bold tracking-[-0.03em] leading-none mb-2">
        {value}
      </p>
      <p className="text-[13px] text-muted-foreground">{label}</p>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: Project['status'] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border tracking-wide',
        STATUS_COLORS[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <motion.div
      className="group flex items-center justify-between rounded-xl border border-border/30 bg-card/30 px-5 py-4 hover:bg-card/60 hover:border-border/60 transition-all duration-200"
      whileHover={{ x: 2 }}
    >
      <div className="min-w-0 mr-4 flex-1">
        <p className="font-medium text-[14px] truncate text-foreground">{project.title}</p>
        {project.description && (
          <p className="text-[12px] text-muted-foreground/60 truncate mt-0.5">
            {project.description}
          </p>
        )}
      </div>
      <StatusBadge status={project.status} />
    </motion.div>
  );
}

export function DashboardOverview() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ projects: Project[] }>('/projects')
      .then(({ projects }) => setProjects(projects))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activeProjects = projects.filter(
    (p) => p.status !== 'COMPLETED' && p.status !== 'ARCHIVED',
  );

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-10 md:space-y-12">
      {/* Welcome header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-mono tracking-[0.28em] text-primary/50 uppercase mb-3">
            Dashboard
          </p>
          <h1 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.03em] leading-tight flex items-center gap-3 flex-wrap">
            {greeting}, {user?.name.split(' ')[0]}
            <Sparkles size={22} className="text-primary/60" />
          </h1>
          <p className="text-[14px] text-muted-foreground mt-2">
            Here's what's happening with your projects.
          </p>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            label="Total projects"
            value={projects.length}
            icon={FolderOpen}
          />
          <StatCard
            label="Active projects"
            value={activeProjects.length}
            icon={MessageSquare}
          />
        </div>
      )}

      {/* Recent projects */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-[17px] font-bold tracking-[-0.01em]">
            Recent projects
          </h2>
          <Link href="/dashboard/projects">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-[13px] text-muted-foreground hover:text-foreground h-8 px-3 rounded-lg"
            >
              View all <ArrowRight size={13} />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[62px] rounded-xl" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border/40 border-dashed bg-card/20 p-14 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="h-7 w-7 text-muted-foreground/30" />
            </div>
            <p className="font-display text-[15px] font-semibold mb-1.5">No projects yet</p>
            <p className="text-[13px] text-muted-foreground mb-6 max-w-xs mx-auto leading-relaxed">
              Your projects with SatUru Studio will appear here once they're created.
            </p>
            <Link href="/dashboard/projects">
              <Button size="sm" className="gap-2 rounded-xl px-5">
                <Plus size={14} />
                New project
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-2.5">
            {projects.slice(0, 5).map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
