import type { ServiceIconName } from "@/content/services";
import { AlertIcon, BuildingIcon, ChartIcon, ShieldIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const icons = { building: BuildingIcon, chart: ChartIcon, shield: ShieldIcon, alert: AlertIcon };

/** Each service's icon sits on its diamond, in that diamond's colour from the BIV mark. */
const tones: Record<ServiceIconName, { diamond: string; icon: string }> = {
  building: { diamond: "bg-diamond-blue", icon: "text-white" },
  chart: { diamond: "bg-diamond-green", icon: "text-white" },
  shield: { diamond: "bg-diamond-yellow", icon: "text-ink-950" },
  alert: { diamond: "bg-diamond-red", icon: "text-white" },
};

const sizes = {
  md: { box: "size-14", icon: "size-6" },
  lg: { box: "size-16 sm:size-20", icon: "size-7 sm:size-8" },
};

export function ServiceIcon({
  name,
  size = "md",
  className,
}: {
  name: ServiceIconName;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const Icon = icons[name];
  return (
    <span className={cn("relative inline-flex items-center justify-center", sizes[size].box, tones[name].icon, className)}>
      {/* A square at 70% of the box, turned 45°, spans the full box corner to corner. */}
      <span aria-hidden="true" className={cn("absolute inset-[15%] rotate-45 rounded-[22%] shadow-card", tones[name].diamond)} />
      <Icon className={cn("relative", sizes[size].icon)} />
    </span>
  );
}
