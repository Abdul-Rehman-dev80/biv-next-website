import type { ServiceIconName } from "@/content/services";
import { AlertIcon, BuildingIcon, ChartIcon, ShieldIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const icons = { building: BuildingIcon, chart: ChartIcon, shield: ShieldIcon, alert: AlertIcon };

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 ring-1 ring-brand-200",
        className,
      )}
    >
      <Icon className="size-6" />
    </span>
  );
}
