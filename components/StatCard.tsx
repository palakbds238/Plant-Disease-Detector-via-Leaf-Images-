import React, { useState, useEffect } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow';
}

const useCountUp = (endValue: number, duration: number = 1500) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const animationFrame = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * endValue);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animationFrame);
            }
        };
        requestAnimationFrame(animationFrame);
    }, [endValue, duration]);

    return count;
};


const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const animatedValue = useCountUp(value);

  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-800' },
    green: { bg: 'bg-green-100', text: 'text-green-800' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  };

  const selectedColor = colorClasses[color];

  return (
    <div className={`${selectedColor.bg} p-6 rounded-lg shadow-lg flex items-center justify-between transition-transform duration-300 hover:-translate-y-1`}>
      <div>
        <p className={`text-sm font-medium ${selectedColor.text}`}>{title}</p>
        <p className={`text-4xl font-bold ${selectedColor.text}`}>{animatedValue}</p>
      </div>
      <div className={`w-12 h-12 ${selectedColor.text}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
