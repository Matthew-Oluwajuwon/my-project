import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 600 },
  { name: 'Group B', value: 200 },
  { name: 'Group C', value: 200 },
  { name: 'Group D', value: 700 },
];

const COLORS = ['#FF0000', '#0000FF', '#C0C0C0', '#008000'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class MyPieChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  render() {
    return (
      <>
      <ResponsiveContainer width="100%" height="50%" className="hello">
        <PieChart width={800} height={800} 
            className="pie-pie">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div>
      <ul className="ul">
        <li className="posts"><span></span>Post</li>
        <li className="comments"><span></span>Comments</li>
        <li className="albums"><span></span>Albums</li>
        <li className="photos"><span></span>Photos</li>
      </ul>
    </div>
    </>
    );
  }
}
