import React, { useEffect, useState } from 'react';
import { User, MapPin, IndianRupee } from 'lucide-react';
import axios from '../axios/axios';



import { useModal } from '../context/Jobcontext';

function JobGrid() {

  const {jobs,setJobs,searchQuery,locationFilter,jobTypeFilter,salaryFilter}=useModal()
 






  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/getjobs');
        setJobs(res.data.data)
        
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  

const filteredJobs = jobs.filter((job) => {
  if (!job) return false;

  const titleMatch = job.title?.toLowerCase().includes(searchQuery.toLowerCase());
  const locationMatch =
    locationFilter === '' ||
    job.location?.toLowerCase() === locationFilter.toLowerCase();

  const jobTypeMatch =
    jobTypeFilter === '' ||
    job.job_type?.toLowerCase() === jobTypeFilter.toLowerCase();

  const [jobMin, jobMax] = (job.salary_range || '0-0')
    .split('-')
    .map((val) => parseInt(val));

  const matchSalary =
    isNaN(salaryFilter) || isNaN(jobMin) ? true : jobMin >= salaryFilter;

  return titleMatch && locationMatch && jobTypeMatch && matchSalary;
});



   return (
    <div className="  px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  shadow-[0px 0px 14px 0px #D3D3D326] gap-[16px]">
      {filteredJobs.map((job, index) => (
        <div
          key={index}
          className="relative w-full h-[360px] rounded-[12px] shadow-[0px_0px_14px_0px_#D3D3D326] text-black bg-white px-5 pt-[100px] pb-6 mx-auto"
        >
          {/* Badge */}
              <div className="absolute top-[30px] left-[265px] w-[75px] h-[33px] rounded-[10px] px-[10px] py-[7px] bg-[#B0D9FF] font-medium text-black text-[14px] font-medium leading-[100%] text-center  flex items-center justify-center">
      {/* {job.created_at ? timeAgo(job.created_at) : 'Just now'} */}  24h Ago
    </div>
          {/* Logo */}
          <img
            src={job.logo || "https://1000logos.net/wp-content/uploads/2021/04/Fedex-logo.png"}
            alt={job.company_name || "Company Logo"}
            className="absolute top-[15px] left-[16px] w-[83.46px] h-[82px] rounded-[13.18px] border border-white shadow-[0px_0px_10.25px_0px_#94949440] opacity-100"
          />
          {/* Title */}
          <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
          {/* Info */}
          <div className="flex items-center text-sm text-gray-600 mb-2 gap-2 flex-wrap">
               <User className="w-4 h-4 " />{job.experience || '1–3 yr Exp'}
            <MapPin className="w-4 h-4" /> {job.location || 'Onsite'}
            <IndianRupee className="w-4 h-4" /> {job.salary_range || '12LPA'}
          </div>
          {/* Description */}
          <ul className="text-sm text-gray-500 mb-4 list-disc pl-4 overflow-y-auto">
            <li>{job.job_description || 'A user-friendly interface lets you browse stunning photos and videos'}</li>
             <li>{job.job_description || 'A user-friendly interface lets you browse stunning photos and videos'}</li>
          </ul>
          {/* Button */}
          <button className=" h-[46px] bg-[#00AAFF] top-[296px] w-[320px] absolute border border-[#00AAFF] text-white text-[14px] font-medium leading-[100%] text-center rounded-[10px] px-[10px] py-[12px] flex items-center justify-center gap-[10px] opacity-100 hover:brightness-110 transition ">
            Apply Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default JobGrid;



