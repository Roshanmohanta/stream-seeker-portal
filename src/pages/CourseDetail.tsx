
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { College, Course } from "@/lib/types";
import { getCourseById, getCollegesForCourse } from "@/lib/mockData";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const courseData = getCourseById(id);
      if (courseData) {
        setCourse(courseData);
        const collegesData = getCollegesForCourse(id);
        setColleges(collegesData);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-heading text-gray-900 mb-4">
            Course Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The course you are looking for does not exist.
          </p>
          <Link to="/courses">
            <Button>Browse All Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const streamColor = course.stream === "science" 
    ? "text-stream-science" 
    : course.stream === "commerce" 
    ? "text-stream-commerce" 
    : "text-stream-arts";

  const streamBgColor = course.stream === "science" 
    ? "bg-stream-science" 
    : course.stream === "commerce" 
    ? "bg-stream-commerce" 
    : "bg-stream-arts";

  return (
    <div className="min-h-screen">
      <div className={`${streamBgColor} py-2`}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 animate-fade-in">
            <div className="flex items-center mb-4">
              <Link to="/courses" className="text-primary hover:underline mr-2">
                Courses
              </Link>
              <span className="mx-2">/</span>
              <Link
                to={`/stream/${course.stream}`}
                className={`${streamColor} hover:underline capitalize mr-2`}
              >
                {course.stream}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-600">{course.title}</span>
            </div>

            <h1 className="text-3xl font-bold font-heading text-gray-900 mb-4">
              {course.title}
            </h1>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Course Description
                  </h2>
                  <p className="text-gray-600">{course.description}</p>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      Duration
                    </h2>
                    <p className="text-gray-600">{course.duration}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      Eligibility
                    </h2>
                    <p className="text-gray-600">{course.eligibility}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Career Prospects
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.careerProspects.map((prospect, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg px-4 py-3 text-gray-700"
                      >
                        {prospect}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 animate-fade-in animate-delay-200">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Info
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Duration
                      </p>
                      <p className="text-gray-700">{course.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Eligibility
                      </p>
                      <p className="text-gray-700">{course.eligibility}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Stream
                      </p>
                      <p className={`${streamColor} capitalize`}>
                        {course.stream}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
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
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Career Paths
                      </p>
                      <p className="text-gray-700">
                        {course.careerProspects.length} career options available
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/register">
                    <Button className="w-full">Get Personalized Guidance</Button>
                  </Link>
                  <a href="#colleges">
                    <Button variant="outline" className="w-full">
                      View Related Colleges
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="colleges" className="mt-12 pb-12 animate-fade-in animate-delay-300">
          <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
            Colleges Offering {course.title}
          </h2>

          {colleges.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {colleges.map((college) => (
                <Link
                  key={college.id}
                  to={`/college/${college.id}`}
                  className="college-card bg-white rounded-xl shadow-lg overflow-hidden transition-all border border-transparent hover:border-primary"
                >
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img
                        className="h-48 w-full object-cover md:h-full md:w-48"
                        src={college.image}
                        alt={college.name}
                      />
                    </div>
                    <div className="p-6">
                      <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                        {college.name}
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.round(college.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-gray-600">
                            {college.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">
                            Average Salary
                          </p>
                          <p className="font-medium text-gray-900">
                            ₹{(college.averageSalary / 100000).toFixed(1)} LPA
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium text-gray-900">
                            {college.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No Colleges Found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any colleges offering this course at the moment.
              </p>
              <Link to="/colleges">
                <Button>Browse All Colleges</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
