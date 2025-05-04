
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Job } from "@/lib/types";
import { getFilteredJobs } from "@/lib/mockData";

const Jobs = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(getFilteredJobs());

  const handleSearch = () => {
    const results = getFilteredJobs(keyword, location, salary, industry, experience);
    setFilteredJobs(results);
  };

  const clearFilters = () => {
    setKeyword("");
    setLocation("");
    setSalary("");
    setIndustry("");
    setExperience("");
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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Search Filters
                </h2>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="keyword">Keywords</Label>
                    <Input
                      id="keyword"
                      placeholder="Job title, company, or skills"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City or state"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Select value={salary} onValueChange={setSalary}>
                      <SelectTrigger id="salary">
                        <SelectValue placeholder="Select salary range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any salary</SelectItem>
                        <SelectItem value="5">₹5+ LPA</SelectItem>
                        <SelectItem value="10">₹10+ LPA</SelectItem>
                        <SelectItem value="15">₹15+ LPA</SelectItem>
                        <SelectItem value="20">₹20+ LPA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Banking & Finance">Banking & Finance</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Media & Communication">Media & Communication</SelectItem>
                        <SelectItem value="Automotive">Automotive</SelectItem>
                        <SelectItem value="Design & Creative">Design & Creative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Select value={experience} onValueChange={setExperience}>
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Experience</SelectItem>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2 space-y-3">
                    <Button
                      className="w-full"
                      onClick={handleSearch}
                    >
                      Search Jobs
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3 animate-fade-in animate-delay-200">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Job Listings
                </h2>
                <div className="text-gray-600">
                  {filteredJobs.length} job
                  {filteredJobs.length !== 1 ? "s" : ""} found
                </div>
              </div>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="job-card bg-white rounded-xl shadow-lg overflow-hidden transition-all border border-transparent hover:border-primary"
                  >
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="mr-4 flex-shrink-0">
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {job.title}
                              </h3>
                              <div className="flex flex-wrap items-center mt-1">
                                <span className="text-gray-600 mr-3">
                                  {job.company}
                                </span>
                                <span className="text-gray-500 flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  {job.location}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 md:mt-0 text-right">
                              <div className="text-primary font-medium">
                                {job.salary}
                              </div>
                              <div className="text-gray-500 text-sm">
                                {job.type}
                              </div>
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div className="text-gray-600 mb-4">
                            {job.description}
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {job.industry}
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {job.experience}
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Posted on {job.postedDate}
                            </span>
                          </div>

                          <div className="flex flex-col md:flex-row gap-3 mt-4">
                            <Link to={`/job/${job.id}`}>
                              <Button>View Details</Button>
                            </Link>
                            <Button variant="outline">Save Job</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No Jobs Found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any jobs matching your search criteria. Try adjusting your filters or search for something else.
                </p>
                <Button onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
