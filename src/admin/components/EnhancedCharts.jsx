import React from "react";
import Chart from 'react-apexcharts';
import styled from "styled-components";
import { motion } from "framer-motion";

// Enhanced chart components with modernize-style animations
export const EnhancedAreaChart = ({ data, title, height = 300, colors = ['#fbb604', '#10b981'] }) => {
  const options = {
    chart: {
      type: 'area',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      foreColor: '#888888',
      toolbar: {
        show: false,
      },
      height: height,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      dropShadow: {
        enabled: true,
        color: colors[0],
        top: 10,
        left: 0,
        blur: 10,
        opacity: 0.1
      }
    },
    colors: colors,
    plotOptions: {
      area: {
        fillTo: 'end',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
        colorStops: colors.map((color, index) => [
          {
            offset: 0,
            color: color,
            opacity: 0.4
          },
          {
            offset: 100,
            color: color,
            opacity: 0.1
          }
        ]).flat()
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      lineCap: 'round'
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.05)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: data.map(item => item.month || item.name || item.label),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#666666',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#666666',
          fontSize: '12px',
        },
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      style: {
        fontSize: '12px',
        fontFamily: "'Inter', sans-serif",
      },
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 250,
          },
        },
      },
    ],
  };

  const series = [
    {
      name: 'Revenue',
      data: data.map(item => item.revenue || item.value || 0),
    },
    {
      name: 'Profit',
      data: data.map(item => item.profit || item.secondary || 0),
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      height={height}
    />
  );
};

export const EnhancedDonutChart = ({ data, height = 300, colors = ['#fbb604', '#10b981', '#8b5cf6', '#ef4444'] }) => {
  const options = {
    chart: {
      type: 'donut',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      foreColor: '#888888',
      toolbar: {
        show: false,
      },
      height: height,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 500
        }
      },
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 5,
        left: 0,
        blur: 10,
        opacity: 0.2
      }
    },
    colors: colors,
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          size: '75%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontFamily: "'Inter', sans-serif",
              color: '#ffffff',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '18px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              color: '#fbb604',
              offsetY: 10,
              formatter: (val) => `${val}%`,
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              color: '#888888',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0) + '%';
              }
            }
          }
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.2,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 50, 100]
      }
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      style: {
        fontSize: '12px',
        fontFamily: "'Inter', sans-serif",
      },
      y: {
        formatter: (value) => `${value}%`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 250,
          },
        },
      },
    ],
  };

  return (
    <Chart
      options={options}
      series={data.map(item => item.value || item.percentage || 0)}
      type="donut"
      height={height}
    />
  );
};

export const EnhancedBarChart = ({ data, height = 300, colors = ['#fbb604', '#10b981'] }) => {
  const options = {
    chart: {
      type: 'bar',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      foreColor: '#888888',
      toolbar: {
        show: false,
      },
      height: height,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      dropShadow: {
        enabled: true,
        color: colors[0],
        top: 5,
        left: 0,
        blur: 10,
        opacity: 0.1
      }
    },
    colors: colors,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 6,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: colors.map(color => color + '80'),
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100]
      }
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent']
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.05)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: data.map(item => item.month || item.name || item.label),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#666666',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#666666',
          fontSize: '12px',
        },
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      style: {
        fontSize: '12px',
        fontFamily: "'Inter', sans-serif",
      },
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 250,
          },
          plotOptions: {
            bar: {
              columnWidth: '70%',
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: 'Revenue',
      data: data.map(item => item.revenue || item.value || 0),
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
    />
  );
};

export const EnhancedLineChart = ({ data, height = 300, colors = ['#fbb604'] }) => {
  const options = {
    chart: {
      type: 'line',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      foreColor: '#888888',
      toolbar: {
        show: false,
      },
      height: height,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      dropShadow: {
        enabled: true,
        color: colors[0],
        top: 10,
        left: 0,
        blur: 10,
        opacity: 0.2
      }
    },
    colors: colors,
    stroke: {
      curve: 'smooth',
      width: 4,
      lineCap: 'round'
    },
    markers: {
      size: 6,
      colors: colors,
      strokeColors: colors,
      strokeWidth: 3,
      hover: {
        size: 8,
        sizeOffset: 2
      }
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.05)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: data.map(item => item.month || item.name || item.label),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#666666',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#666666',
          fontSize: '12px',
        },
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      style: {
        fontSize: '12px',
        fontFamily: "'Inter', sans-serif",
      },
      marker: {
        show: true,
      },
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 250,
          },
        },
      },
    ],
  };

  const series = [
    {
      name: 'Value',
      data: data.map(item => item.revenue || item.value || 0),
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={height}
    />
  );
};

export const EnhancedRadialChart = ({ percentage, title, height = 200, color = '#fbb604' }) => {
  const options = {
    chart: {
      type: 'radialBar',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      height: height,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1200,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 500
        }
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: '60%',
          background: 'transparent',
        },
        track: {
          background: 'rgba(255, 255, 255, 0.05)',
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '14px',
            color: '#888888',
            offsetY: 10
          },
          value: {
            show: true,
            fontSize: '24px',
            fontWeight: 700,
            color: color,
            offsetY: -10,
            formatter: (val) => `${val}%`
          }
        }
      }
    },
    colors: [color],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'diagonal1',
        shadeIntensity: 0.8,
        gradientToColors: [color + '80'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: [title],
  };

  return (
    <Chart
      options={options}
      series={[percentage]}
      type="radialBar"
      height={height}
    />
  );
};