import { cn } from '@/lib/utils';

export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn('skeleton-shimmer rounded-md', className)} style={style} />
  );
}

export function SkeletonCard() {
  return (
    <div className="card-vintage overflow-hidden">
      <Skeleton className="h-40 rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4" style={{ width: `${100 - i * 10}%` }} />
      ))}
    </div>
  );
}

export function SkeletonCircle({ size = 40 }: { size?: number }) {
  return <Skeleton className="rounded-full" />;
}
