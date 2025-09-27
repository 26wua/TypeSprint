import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Props for individual statistic displays
 * @interface StatisticCardProps
 * @property {string} title - The title/label for the statistic
 * @property {string | number} value - The current value to display
 * @property {string} unit - Unit of measurement (e.g., "WPM", "%", "chars")
 * @property {string} testId - Test ID for the statistic card
 */
interface StatisticCardProps {
  title: string;
  value: string | number;
  unit: string;
  testId: string;
}

/**
 * Individual statistic card component
 */
function StatisticCard({ title, value, unit, testId }: StatisticCardProps) {
  return (
    <Card data-testid={testId}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
          <span className="text-sm font-normal text-muted-foreground ml-1">
            {unit}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Props for the StatisticsPanel component
 * @interface StatisticsPanelProps
 * @property {number} wpm - Words per minute calculation
 * @property {number} accuracy - Accuracy percentage (0-100)
 * @property {number} charactersTyped - Total characters typed by user
 * @property {number} timeLeft - Remaining time in seconds
 */
interface StatisticsPanelProps {
  wpm: number;
  accuracy: number;
  charactersTyped: number;
  timeLeft: number;
}

/**
 * StatisticsPanel component displays real-time typing statistics
 * Shows WPM, accuracy percentage, characters typed, and time remaining
 * Each statistic is displayed in its own card for clear visual separation
 */
export default function StatisticsPanel({ 
  wpm, 
  accuracy, 
  charactersTyped, 
  timeLeft 
}: StatisticsPanelProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="statistics-panel">
      <StatisticCard
        title="Speed"
        value={Math.round(wpm)}
        unit="WPM"
        testId="stat-wpm"
      />
      <StatisticCard
        title="Accuracy"
        value={Math.round(accuracy)}
        unit="%"
        testId="stat-accuracy"
      />
      <StatisticCard
        title="Characters"
        value={charactersTyped}
        unit="typed"
        testId="stat-characters"
      />
      <StatisticCard
        title="Time Left"
        value={timeLeft}
        unit="sec"
        testId="stat-time"
      />
    </div>
  );
}