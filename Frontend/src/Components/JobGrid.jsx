import React, { useEffect, useState } from 'react';
import { User, MapPin, IndianRupee } from 'lucide-react';
import axios from '../axios/axios';



import { useModal } from '../context/Jobcontext';

function JobGrid() {

  const {jobs,setJobs,searchQuery,locationFilter,jobTypeFilter,salaryFilter}=useModal()
 
  const [isLoading, setIsLoading] = useState(true);





  useEffect(() => {
    const fetchJobs = async () => {
       setIsLoading(true);
      try {
        const res = await axios.get('/getjobs');
        setJobs(res.data.data)
        
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }finally {
        setIsLoading(false);
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

const SkeletonCard = () => (
    <div className="relative w-full h-[360px] rounded-[12px] shadow-[0px_0px_14px_0px_#D3D3D326] bg-white px-5 pt-[100px] pb-6 mx-auto animate-pulse">
      {/* Badge Skeleton */}
      <div className="absolute top-[30px] left-[265px] w-[75px] h-[33px] rounded-[10px] bg-gray-200"></div>
      {/* Logo Skeleton */}
      <div className="absolute top-[15px] left-[16px] w-[83.46px] h-[82px] rounded-[13.18px] bg-gray-200"></div>
      {/* Title Skeleton */}
      <div className="w-3/4 h-5 bg-gray-200 rounded mb-2"></div>
      {/* Info Skeleton */}
      <div className="flex items-center text-sm text-gray-600 mb-2 gap-2 flex-wrap">
        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
      </div>
      {/* Description Skeleton */}
      <div className="text-sm text-gray-500 mb-4">
        <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
      </div>
      {/* Button Skeleton */}
      <div className="absolute top-[296px] w-[320px] h-[46px] rounded-[10px] bg-gray-200"></div>
    </div>
  );



     return (
    <div className="px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-[0px_0px_14px_0px_#D3D3D326] gap-[16px]">
      {isLoading ? (
        // Render 4 skeleton cards during loading
        Array(4)
          .fill()
          .map((_, index) => <SkeletonCard key={index} />)
      ) : (
        filteredJobs.map((job, index) => (
          <div
            key={index}
            className="relative w-full h-[360px] rounded-[12px] shadow-[0px_0px_14px_0px_#D3D3D326] text-black bg-white px-5 pt-[100px] pb-6 mx-auto"
          >
            {/* Badge */}
            <div className="absolute top-[30px] left-[265px] w-[75px] h-[33px] rounded-[10px] px-[10px] py-[7px] bg-[#B0D9FF] font-medium text-black text-[14px] font-medium leading-[100%] text-center flex items-center justify-center">
              24h Ago
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
              <User className="w-4 h-4" /> {job.experience || '1–3 yr Exp'}
              <MapPin className="w-4 h-4" /> {job.location || 'Onsite'}
              <IndianRupee className="w-4 h-4" /> {job.salary_range || '12LPA'}
            </div>
            {/* Description */}
            <ul className="text-sm text-gray-500 mb-4 list-disc pl-4 overflow-y-auto">
              <li>{job.job_description || 'A user-friendly interface lets you browse stunning photos and videos'}</li>
            </ul>
            {/* Button */}
            <button className="h-[46px] bg-[#00AAFF] top-[296px] w-[320px] absolute border border-[#00AAFF] text-white text-[14px] font-medium leading-[100%] text-center rounded-[10px] px-[10px] py-[12px] flex items-center justify-center gap-[10px] opacity-100 hover:brightness-110 transition">
              Apply Now
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default JobGrid;



