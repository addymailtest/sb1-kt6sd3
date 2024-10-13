import React, { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
  SeriesType,
} from 'lightweight-charts';
import { DateTime } from 'luxon';
import LineChart from './Charts/LineChart';
import CandleChart from './Charts/CandleChart';

interface PriceHistoryChartProps {
  coinName: string;
  priceHistory: { time: number; value: number }[];
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({
  coinName,
  priceHistory,
}) => {
  const [chartType, setChartType] = useState<'line' | 'candle'>('line');
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<SeriesType> | null>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{coinName} Price History</h3>
        <div>
          <button
            className={`px-3 py-1 rounded-l-md ${
              chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setChartType('line')}
          >
            Line
          </button>
          <button
            className={`px-3 py-1 rounded-r-md ${
              chartType === 'candle' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setChartType('candle')}
          >
            Candle
          </button>
        </div>
      </div>
      <div>
        {chartType === 'line' ? (
          <LineChart priceHistory={priceHistory} />
        ) : (
          <CandleChart priceHistory={priceHistory} />
        )}
      </div>
    </div>
  );
};

export default PriceHistoryChart;
