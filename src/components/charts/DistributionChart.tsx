import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { DistributionRow } from '../../types';
import { formatPercent } from '../../utils/survey';

interface DistributionChartProps {
  rows: DistributionRow[];
  /** Highlight the most frequent answer. */
  highlightMax?: boolean;
  compact?: boolean;
}

interface ChartRow extends DistributionRow {
  rest: number;
  valueLabel: string;
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartRow }> }) {
  const row = payload?.[0]?.payload;
  if (!active || !row) return null;
  return (
    <div className="rounded-lg border border-line-strong bg-ink-950/95 px-3 py-2 text-xs shadow-xl">
      <p className="font-medium text-fg">{row.label}</p>
      <p className="mt-1 tabular-nums text-fg-muted">
        {row.count} отв. · {formatPercent(row.percent)}
      </p>
    </div>
  );
}

/**
 * Single-series horizontal bar chart of an answer distribution.
 * The bar is stacked on a neutral track (100%) so empty options stay visible;
 * the right-hand axis carries the direct percentage labels.
 */
export function DistributionChart({ rows, highlightMax = true, compact = false }: DistributionChartProps) {
  const data: ChartRow[] = rows.map((r) => ({
    ...r,
    rest: Math.max(0, 100 - r.percent),
    valueLabel: `${formatPercent(r.percent)} · ${r.count}`,
  }));
  const max = Math.max(...rows.map((r) => r.count));
  const rowH = compact ? 34 : 42;
  const tickStyle = { fill: '#A3ABBD', fontSize: compact ? 12 : 13 };

  return (
    <div style={{ height: rows.length * rowH + 8 }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 0, bottom: 4, left: 0 }} barCategoryGap="28%">
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis yAxisId="label" type="category" dataKey="label" width={compact ? 128 : 150} tickLine={false} axisLine={false} tick={tickStyle} />
          <YAxis
            yAxisId="value"
            orientation="right"
            type="category"
            dataKey="valueLabel"
            width={72}
            tickLine={false}
            axisLine={false}
            tick={{ ...tickStyle, fill: '#EEF1F7' }}
          />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} content={<ChartTooltip />} isAnimationActive={false} />
          <Bar yAxisId="label" dataKey="percent" stackId="d" radius={[4, 0, 0, 4]} isAnimationActive animationDuration={600}>
            {data.map((r) => (
              <Cell key={r.optionId} fill={highlightMax && max > 0 && r.count === max ? '#4C8DFF' : '#3D63A8'} />
            ))}
          </Bar>
          <Bar yAxisId="label" dataKey="rest" stackId="d" fill="#1A2133" radius={[0, 4, 4, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
