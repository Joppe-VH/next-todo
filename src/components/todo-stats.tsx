import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { type FilterType } from "@/types";

type TodoStatsProps = Record<FilterType, number>;

export function TodoStats({ all, completed, active }: TodoStatsProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Todo Statistics</h2>
        <div className="flex gap-2">
          <Badge variant="outline">All: {all}</Badge>
          <Badge variant="secondary">Active: {active}</Badge>
          <Badge variant="default">Completed: {completed}</Badge>
        </div>
      </div>
      {all > 0 && (
        <div className="mt-2">
          <div className="text-sm text-muted-foreground">
            Progress: {Math.round((completed / all) * 100)}% complete
          </div>
          <div className="w-full bg-secondary rounded-full h-2 mt-1">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completed / all) * 100}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
