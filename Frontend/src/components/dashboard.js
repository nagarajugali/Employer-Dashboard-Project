import React,{useEffect, useState} from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  LineChart, Line,CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

export default function Dashboard({ employeeList = [] }) {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  const [totalOther, setTotalOther] = useState(0);
  const [ageGroup, setAgeGroup] = useState({ under30: 0, between30and50: 0, above50: 0 });
  const [joiningYearStats, setJoiningYearStats] = useState({});
  useEffect(()=>{
  if (!employeeList || employeeList.length === 0) {
    console.warn("No employee data available");
    return;
  }
  setTotalEmployees(employeeList.length);
  setTotalMale(employeeList.filter(emp => emp.gender.toLowerCase() === "male").length);
  setTotalFemale(employeeList.filter(emp => emp.gender.toLowerCase() === "female").length);
  setTotalOther (employeeList.filter(emp => emp.gender.toLowerCase() === "other").length);
  setAgeGroup(employeeList.reduce((acc, emp) => {
    if (emp.age < 30) acc.under30++;
    else if (emp.age >= 30 && emp.age < 50) acc.between30and50++;
    else acc.above50++;
    return acc;
  }, { under30: 0, between30and50: 0, above50: 0 }));
  const yearstats={};
  employeeList.forEach(emp => {
    const date = new Date(emp.joining_date);
    const year = date.getFullYear();
    yearstats[year] = (yearstats[year] || 0) + 1;
  });
  
  
  const FillMissingYears= (stats)=>{
    const years=Object.keys(stats).map(Number);
    const minYear=Math.min(...years);
    const maxYear=Math.max(...years);
    for(let year=minYear-1;year<=maxYear+1;year++){
      if(!stats[year]){
        stats[year]=0;
      }
    }

  }
FillMissingYears(yearstats);
  setJoiningYearStats(yearstats);
  },[employeeList]);

  const genderData = [
    { name: 'Male', value: totalMale },
    { name: 'Female', value: totalFemale },
    { name: 'Other', value: totalOther }
  ];

  const ageGroupData = [
    { name: '<30', value: ageGroup.under30 },
    { name: '30-50', value: ageGroup.between30and50 },
    { name: '>50', value: ageGroup.above50 }
  ];

  const joiningYearData = Object.entries(joiningYearStats).map(([year, empjoined]) => ({
    year,
    empjoined,
  }));

  const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

  return (
    <div className="containe mt-4">
      <div className="row mb-4">
        {[
  ['Total Employees', totalEmployees],
  ['Total Male', totalMale],
  ['Total Female', totalFemale],
  ['Other Gender', totalOther],
].map(([title, count], idx) => (
          <div className="col-md-3 mb-3" key={idx}>
            <div className="card ">
              <div className="card-body text-center">
                <h5 className="card-title">{title}</h5>
                <p className="display-6">{count}</p>
              </div>
            </div>
          </div>))}
          {/* linechart for joining year stats */}
        <div className="col-md-4 mb-3"> 
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={joiningYearData}>
              <CartesianGrid strokeDasharray="3 3"  />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="empjoined" stroke="#8884d8" />
            </LineChart>
          <h4 className='text-center text-white'>Joining Year Statistics</h4>
          </ResponsiveContainer>
          </div>
          {/* barchart for age group stats */}
          <div className="col-md-4 mb-3">
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageGroupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
            <Bar dataKey="value" fill="blue" />
            </BarChart>
            <h4 className='text-center text-white'>Age Group Statistics</h4>
             </ResponsiveContainer>
          </div>
          <div className='col-md-4 mb-3'>
            <ResponsiveContainer width="100%" height={300}> 
             <PieChart>
              <Pie 
                data={genderData}
                cx="50%"
                cy="50%"
                dataKey="value"
                nameKey="name"
                fill='#8884d8'
                label>
                  {
                    genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]}/>

                    ))
                  }
                  </Pie>
                <Tooltip />
                <Legend />

             </PieChart>
             <h4 className='text-center text-white'> Gender Statistics</h4> 
            </ResponsiveContainer>
            </div>

          



        </div>
        </div>
  );}
      
      
  
