import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
}

const StatsCard = ({ label, value, suffix = "", icon: Icon }: Props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card className="glass-card glow text-center">
      <CardContent className="pt-6 pb-6">
        <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <p className="text-3xl font-bold gradient-text">
          {count}
          {suffix}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
