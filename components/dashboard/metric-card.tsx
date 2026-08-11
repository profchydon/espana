import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { formatEuroPlain } from "@/lib/format";

type MetricCardProps = {
  label: string;
  value: number;
  trend?: { value: string; positive: boolean };
  icon: LucideIcon;
  accent?: "ginger" | "iris" | "sunshine" | "green";
};

const accentMap = {
  ginger: "metric-accent-ginger",
  iris: "metric-accent-iris",
  sunshine: "metric-accent-sunshine",
  green: "metric-accent-green",
};

export function MetricCard({ label, value, trend, icon: Icon, accent = "ginger" }: MetricCardProps) {
  return (
    <div className={`metric-card ${accentMap[accent]}`}>
      <div className="metric-card-top">
        <div className="metric-icon">
          <Icon size={18} strokeWidth={1.8} />
        </div>
        {trend ? (
          <span className={`badge ${trend.positive ? "b-success" : "b-danger"}`}>
            {trend.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend.value}
          </span>
        ) : null}
      </div>
      <div className="metric-label">{label}</div>
      <div className="metric-value tnum">{formatEuroPlain(value)}</div>
    </div>
  );
}
