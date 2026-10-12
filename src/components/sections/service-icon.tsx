import type { ServiceIconName } from "@/content/services";
import { AlertIcon, BuildingIcon, ChartIcon, ShieldIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const icons = { building: BuildingIcon, chart: ChartIcon, shield: ShieldIcon, alert: AlertIcon };

/** Each service's icon sits on its diamond colour from the BIV mark. */
const tones: Record<ServiceIconName, string> = {
  building: "bg-diamond-blue text-white",
  chart: "bg-diamond-green text-white",
  shield: "bg-diamond-yellow text-ink-950",
  alert: "bg-diamond-red text-white",
};

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return (
    <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl shadow-card", tones[name], className)}>
      <Icon className="size-6" />
    </span>
  );
}
