
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

interface JobListProps {
  jobs: Job[];
}

const JobList = ({ jobs }: JobListProps) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            Job Listings
          </h2>
          <div className="text-gray-600">
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
          </div>
        </div>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-6">
          {jobs.map((job) => (
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
          <Button onClick={() => {}}>
            Clear Filters
          </Button>
        </div>
      )}
    </>
  );
};

export default JobList;
