import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { College, Course } from "@/lib/types";
import { getCollegeById, getCourseById } from "@/lib/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CollegeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [college, setCollege] = useState<College | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const collegeData = getCollegeById(id);
      if (collegeData) {
        setCollege(collegeData);
        const coursesData = collegeData.courses.map(
          (courseId) => getCourseById(courseId)!
        );
        setCourses(coursesData.filter((course): course is Course => !!course));
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

  if (!college) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-heading text-gray-900 mb-4">
            College Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The college you are looking for does not exist.
          </p>
          <Link to="/colleges">
            <Button>Browse All Colleges</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-primary py-2"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 animate-fade-in">
            <div className="flex items-center mb-4">
              <Link to="/colleges" className="text-primary hover:underline mr-2">
                Colleges
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-600">{college.name}</span>
            </div>

            <h1 className="text-3xl font-bold font-heading text-gray-900 mb-4">
              {college.name}
            </h1>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
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
                      <span className="ml-2 text-gray-700">
                        {college.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-gray-600 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1 text-gray-400"
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
                      {college.location}
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Available Courses
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course) => (
                      <Link
                        key={course.id}
                        to={`/course/${course.id}`}
                        className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors"
                      >
                        <h3 className="font-semibold text-gray-900">
                          {course.title}
                        </h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-500">
                            {course.duration}
                          </span>
                          <span
                            className={`text-sm px-2 py-1 rounded-full capitalize ${
                              course.stream === "science"
                                ? "bg-blue-100 text-blue-800"
                                : course.stream === "commerce"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {course.stream}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Campus Recruitment
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Top Recruiting Companies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {college.companies.map((company, index) => (
                        <span
                          key={index}
                          className="bg-white border rounded-full px-4 py-2 text-sm text-gray-700"
                        >
                          {company}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Average Salary Package
                      </h3>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{(college.averageSalary / 100000).toFixed(1)} LPA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Admission Process
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="application-process">
                        <AccordionTrigger className="text-lg font-semibold text-gray-800">
                          Application Process
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 pt-4">
                          <p>{college.applicationProcess}</p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="important-dates">
                        <AccordionTrigger className="text-lg font-semibold text-gray-800">
                          Important Dates
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Date</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {Object.entries(college.importantDates).map(
                                ([event, date]) => (
                                  <TableRow key={event}>
                                    <TableCell className="font-medium">
                                      {event}
                                    </TableCell>
                                    <TableCell>{date}</TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="fees">
                        <AccordionTrigger className="text-lg font-semibold text-gray-800">
                          Admission Fees
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 pt-4">
                          <p className="mb-2">
                            <span className="font-semibold">Annual fees:</span> ₹
                            {college.admissionFees.toLocaleString()}
                          </p>
                          <p>
                            <span className="font-semibold">
                              Estimated total fees:
                            </span>{" "}
                            ₹
                            {(
                              college.admissionFees * 
                              (courses[0] ? parseInt(courses[0].duration.split(" ")[0]) || 1 : 1)
                            ).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            * Fees may vary based on course selection and
                            scholarships
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Location
                      </p>
                      <p className="text-gray-700">{college.location}</p>
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
                        Courses Offered
                      </p>
                      <p className="text-gray-700">
                        {courses.length} course
                        {courses.length !== 1 ? "s" : ""}
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
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Annual Fees
                      </p>
                      <p className="text-gray-700">
                        ₹{college.admissionFees.toLocaleString()}
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
                          d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Average Package
                      </p>
                      <p className="text-gray-700">
                        ₹{(college.averageSalary / 100000).toFixed(1)} LPA
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/register">
                    <Button className="w-full">Apply Now</Button>
                  </Link>
                  <a href="#courses">
                    <Button variant="outline" className="w-full">
                      View All Courses
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
