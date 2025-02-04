'use client';
import dynamic from 'next/dynamic';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { KPIInputSwitch } from 'sde2-design-system';
import { ChartDataType } from '../server/actions/get.security.metrics.chart.data';
import { TrendChartKPI } from '../types/score.card.output';
import { SecComContext } from '../types/sec.com.context';
import { LoadingComponent } from './loading.component';

const CommonSecurityChartComponent = dynamic(
  () => import('./common.security.chart'),
  { loading: () => <LoadingComponent />, ssr: false },
);

export function RSCChartWrapper({
  context,
  trendChartKPI,
  data,
  qrsToggleLabels,
  qrsChecked = false,
  handleQRSToggleChange,
}: Readonly<{
  context: SecComContext;
  trendChartKPI: TrendChartKPI;
  data: ChartDataType | undefined;
  qrsToggleLabels: string[];
  qrsChecked?: boolean;
  handleQRSToggleChange: (value: boolean) => void;
}>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    if (!isDialogOpen) {
      setTimeout(() => {
        setChartData(data);
        console.log('data: ', data);
      }, 100);
    }
  }, [isDialogOpen, data]);

  const chartDescription = () => {
    return (
      <div>
        <p>{trendChartKPI.description}</p>
        {(trendChartKPI.field === 'wra' ||
          trendChartKPI.field === 'wrt_wra') && (
          <div
            className={'flex flex-row align-items-center'}
            style={{ fontSize: '0.9rem' }}
          >
            <div style={{ paddingRight: '0.5rem', fontWeight: '500' }}>
              {qrsToggleLabels[0]}
            </div>
            <KPIInputSwitch
              checked={qrsChecked}
              onToggleChange={value => handleQRSToggleChange(value)}
            />
            <div style={{ paddingLeft: '0.5rem', fontWeight: '500' }}>
              {qrsToggleLabels[1]}
            </div>
          </div>
        )}
      </div>
    );
  };

  const chartHeader = `${trendChartKPI.title}${trendChartKPI.isCyberCup ? '*' : ''}  (Target ${trendChartKPI.target})`;

  const handleClick = () => {
    setIsDialogOpen(true);
  };
  return (
    <div className="card">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>{chartHeader}</h4>
          <Button
            icon="pi pi-expand"
            className="p-button-text"
            onClick={handleClick}
            disabled={!chartData}
          />
        </div>
        {chartDescription()}
      </div>
      <div
        className="flex justify-content-center"
        style={{ minHeight: '381px' }}
      >
        {!chartData || chartData.labels.length == 0 ? (
          <div
            className="flex align-items-center"
            style={{ fontWeight: 'bold', fontSize: 'larger' }}
          >
            No data available
          </div>
        ) : (
          <CommonSecurityChartComponent
            chartData={chartData}
            trendChartKPI={trendChartKPI}
          />
        )}
      </div>

      <Dialog
        header={chartHeader}
        visible={isDialogOpen}
        style={{ width: '90vw', height: '90vh' }}
        onHide={() => setIsDialogOpen(false)}
        modal
        resizable={false}
      >
        {chartDescription()}

        {chartData && (
          <CommonSecurityChartComponent
            chartData={chartData}
            trendChartKPI={trendChartKPI}
          />
        )}
      </Dialog>
    </div>
  );
}
--------------------------------------------------
'use client';

import { ChartData, DefaultDataPoint } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dynamic from 'next/dynamic';
import { TrendChartKPI } from '../types/score.card.output';
import { getProgressColor } from '../utils/constants';
import { LoadingComponent } from './loading.component';

interface Props {
  chartData: ChartData<'line', DefaultDataPoint<'line'>, unknown>;
  trendChartKPI: TrendChartKPI;
}

const ChartCore2 = dynamic(
  () => import('sde2-design-system').then(mod => mod.ChartCore2),
  { loading: () => <LoadingComponent />, ssr: false },
);

const getTargetNumberFromString = (target: string) => {
  const match = target.match(/([><=]+)\s*(\d+)/);
  if (match) {
    const operator = match[1];
    const value = parseInt(match[2], 10);
    return { operator, value };
  }
  return { operator: '>=', value: 0 };
};

const getColor = (value: number, target: string) => {
  const { operator, value: targetValue } = getTargetNumberFromString(target);
  const tenPercentOfTarget = targetValue * 0.1;
  const trendColor = getProgressColor();

  switch (operator) {
    case '>':
      if (value > targetValue) return trendColor.green;
      if (value <= targetValue && value > targetValue - tenPercentOfTarget)
        return trendColor.yellow;
      return trendColor.red;
    case '>=':
      if (value >= targetValue) return trendColor.green;
      if (value < targetValue && value >= targetValue - tenPercentOfTarget)
        return trendColor.yellow;
      return trendColor.red;
    case '<':
      if (value < targetValue) return trendColor.green;
      if (value >= targetValue && value < targetValue + tenPercentOfTarget)
        return trendColor.yellow;
      return trendColor.red;
    case '<=':
      if (value <= targetValue) return trendColor.green;
      if (value > targetValue && value <= targetValue + tenPercentOfTarget)
        return trendColor.yellow;
      return trendColor.red;
    case '=':
      if (value == targetValue) return trendColor.green;
      return trendColor.red;
    default:
      return trendColor.red;
  }
};

const CommonSecurityChartComponent = ({ chartData, trendChartKPI }: Props) => {
  return (
    <div className="h-full w-full">
      <ChartCore2
        className="h-full w-full"
        data={chartData}
        type="line"
        downloadFileName="Progress"
        initialHeight={381}
        externalPlugins={[ChartDataLabels]}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = Number(context.raw).toFixed(
                    trendChartKPI.field === 'unacceptable_risk' ? 0 : 1,
                  );
                  return `${value}${trendChartKPI.field === 'unacceptable_risk' ? '' : '%'}`;
                },
              },
            },
            datalabels: {
              display: true,
              backgroundColor: ctx => {
                return getColor(
                  Number(ctx.dataset.data[ctx.dataIndex]),
                  trendChartKPI.target,
                );
              },
              color: 'black',
              padding: 0,
              font: {
                weight: 'bold',
              },
              formatter: val => {
                return Number(val).toFixed(
                  trendChartKPI.field === 'unacceptable_risk' ? 0 : 1,
                );
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },

              offset: true,
              title: {
                display: true,
                text: 'Date',
                font: { size: 14, weight: 'bold' },
              },
            },

            y: {
              offset: true,
              title: {
                display: true,
                text:
                  trendChartKPI.field === 'unacceptable_risk'
                    ? '# of L1 Applications in Unacceptable Risk'
                    : '% of Completed Scan',
                font: { size: 14, weight: 'bold' },
              },
              ticks: {
                callback: value =>
                  Number(value).toFixed(
                    trendChartKPI.field === 'unacceptable_risk' ? 0 : 1,
                  ),
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CommonSecurityChartComponent;
--------------------------------------
import {
  Chart,
  ChartComponentLike,
  ChartData,
  ChartOptions,
  ChartType,
  DefaultDataPoint,
  Plugin,
  registerables,
} from 'chart.js';
import { classNames } from 'primereact/utils';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { createFileName, useRefDimension, useScreenshot } from '../utils';

export { type ChartOptions as ChartOptionsV2 } from 'chart.js';

export interface ChartCore2Props<T extends ChartType = 'line'> {
  type: T;
  data: ChartData<T, DefaultDataPoint<T>, unknown>;
  options?: ChartOptions<T>;
  plugins?: Plugin<T>[];
  downloadFileName?: string;
  downloadRef?: RefObject<HTMLElement | null>;
  className?: string | any[];
  initialHeight?: number;
  initialWidth?: number;
  externalPlugins?: ChartComponentLike[];
}

export const ChartCore2 = <T extends ChartType = 'line'>({
  type,
  data,
  options,
  plugins,
  downloadFileName,
  downloadRef,
  className,
  initialHeight = 0,
  initialWidth = 0,
  externalPlugins,
}: ChartCore2Props<T>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const screenshot = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0,
  });
  useEffect(() => {
    Chart.register(...registerables, ...(externalPlugins ?? []));

    return () => {
      if (externalPlugins?.length) {
        externalPlugins.forEach(item => Chart.unregister(item));
      }
    };
  }, [externalPlugins]);

  const { height, width } = useRefDimension(parentRef, {
    height: initialHeight ?? 0,
    width: initialWidth ?? 0,
  });

  const handleDownload = useCallback(async () => {
    if (canvasRef.current && parentRef.current) {
      const img = await screenshot.takeScreenShot(parentRef.current);
      const a = document.createElement('a');
      a.href = img ?? '';
      a.download = createFileName('jpg', downloadFileName ?? 'sde2-capture');
      a.click();
    }
  }, [downloadFileName, screenshot]);

  useEffect(() => {
    if (!downloadRef?.current) return;
    const button = downloadRef.current;
    button.addEventListener('click', handleDownload);
    return () => {
      button.removeEventListener('click', handleDownload);
    };
  }, [downloadRef, handleDownload]);

  useEffect(() => {
    let chartRef: Chart<T, DefaultDataPoint<T>, unknown> | null = null;

    if (canvasRef.current) {
      chartRef = new Chart<T>(canvasRef.current, {
        type,
        data,
        options,
        plugins,
      });
    }

    return () => {
      if (chartRef) {
        chartRef.destroy();
      }
    };
  }, [data, options, plugins, type, height, width]);

  return (
    <div className={classNames(className)} ref={parentRef}>
      <canvas ref={canvasRef} height={height} width={width}></canvas>
    </div>
  );
};
