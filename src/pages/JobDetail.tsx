
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getJobById } from "@/lib/mockData";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const JobDetail = () => {
  const { id } = useParams();
  const job = getJobById(id || "");
  const { toast } = useToast();

  const handleApply = () => {
    toast({
      title: "Application Submitted",
      description: "Your job application has been submitted successfully.",
    });
  };

  const handleSaveJob = () => {
    toast({
      title: "Job Saved",
      description: "This job has been saved to your profile.",
    });
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
            <p className="text-gray-600 mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/jobs">
              <Button>Back to Jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/jobs" className="inline-flex items-center text-primary mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Jobs
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex items-start">
                <div className="mr-6">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center mt-2 text-gray-600">
                    <span className="mr-4">{job.company}</span>
                    <span className="flex items-center mr-4">
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
                    <span className="flex items-center mr-4">
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
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <div className="text-xl font-bold text-primary">{job.salary}</div>
                <div className="text-sm text-gray-500">Posted on {job.postedDate}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {job.industry}
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {job.experience}
              </span>
            </div>

            <Separator className="my-8" />

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Job Description</h2>
              <p className="text-gray-700">{job.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" onClick={handleApply}>Apply Now</Button>
              <Button variant="outline" size="lg" onClick={handleSaveJob}>Save Job</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
