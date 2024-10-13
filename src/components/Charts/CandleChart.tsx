import React, { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
  SeriesType,
} from 'lightweight-charts';
import { DateTime } from 'luxon';

interface PriceHistoryChartProps {
  priceHistory: { time: number; value: number }[];
}

const CandleChart: React.FC<PriceHistoryChartProps> = ({ priceHistory }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<SeriesType> | null>(null);

  useEffect(() => {
    if (chartContainerRef.current && priceHistory.length > 0) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { type: ColorType.Solid, color: 'white' },
          textColor: 'black',
        },
        grid: {
          vertLines: { color: 'rgba(197, 203, 206, 0.5)' },
          horzLines: { color: 'rgba(197, 203, 206, 0.5)' },
        },
        rightPriceScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
        },
      });
      const candleSeries = chart.addCandlestickSeries({
        upColor: 'rgb(75, 192, 192)',
        downColor: 'rgb(255, 99, 132)',
        borderVisible: false,
        wickUpColor: 'rgb(75, 192, 192)',
        wickDownColor: 'rgb(255, 99, 132)',
      });
      const candleData = priceHistory.map((item, index, array) => ({
        time: item.time,
        open: index > 0 ? array[index - 1].value : item.value,
        high: item.value,
        low: item.value,
        close: item.value,
      }));
      candleSeries.setData(candleData);

      chart.timeScale().fitContent();

      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [priceHistory]);

  return <div ref={chartContainerRef} />;
};

export default CandleChart;
