import StatisticsPanel from '../StatisticsPanel';

export default function StatisticsPanelExample() {
  return (
    <StatisticsPanel
      wpm={67}
      accuracy={94.5}
      charactersTyped={145}
      timeLeft={32}
    />
  );
}