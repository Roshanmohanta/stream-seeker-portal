
import { useState } from "react";
import { Job } from "@/lib/types";
import { getFilteredJobs } from "@/lib/mockData";
import JobFilter from "@/components/jobs/JobFilter";
import JobList from "@/components/jobs/JobList";

const Jobs = () => {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(getFilteredJobs());

  const handleSearch = (keyword: string, location: string, salary: string, industry: string, experience: string) => {
    const results = getFilteredJobs(keyword, location, salary, industry, experience);
    setFilteredJobs(results);
  };

  const clearFilters = () => {
    setFilteredJobs(getFilteredJobs());
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-heading text-gray-900">
              Find Your Dream Job
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Search and apply for jobs that match your skills, interests, and career goals.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search Filters */}
          <div className="lg:col-span-1 animate-fade-in">
            <JobFilter onFilter={handleSearch} onClear={clearFilters} />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3 animate-fade-in animate-delay-200">
            <JobList jobs={filteredJobs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
