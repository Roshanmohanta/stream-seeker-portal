
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StreamType } from "@/lib/types";
import { getStreamCourses } from "@/lib/mockData";

const Index = () => {
  const [selectedStream, setSelectedStream] = useState<StreamType | null>(null);

  const handleStreamSelect = (stream: StreamType) => {
    setSelectedStream(stream);
  };

  const streamCourses = selectedStream ? getStreamCourses(selectedStream) : [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 leading-tight">
                Find Your Perfect{" "}
                <span className="text-primary">Educational Path</span> and{" "}
                <span className="text-primary">Career</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                Explore recommended courses based on your preferred stream, discover top colleges, 
                and find job opportunities that match your skills and interests.
              </p>
              <div className="mt-10">
                <Link to="/courses">
                  <Button size="lg" className="mr-4">
                    Explore Courses
                  </Button>
                </Link>
                <Link to="/jobs">
                  <Button variant="outline" size="lg">
                    Find Jobs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block animate-fade-in animate-delay-300">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                alt="Students discussing their career options"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stream Selection Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
              Choose Your Stream
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select your preferred stream to see recommended courses that align with your interests and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`stream-card rounded-xl overflow-hidden shadow-lg transition-all ${
                selectedStream === "science"
                  ? "ring-4 ring-stream-science"
                  : "hover:shadow-xl"
              }`}
              onClick={() => handleStreamSelect("science")}
            >
              <div className="bg-stream-science h-3"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Science</h3>
                <p className="text-gray-600 mb-4">
                  Explore courses in Engineering, Medical Sciences, and more.
                </p>
                <Button
                  variant={selectedStream === "science" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleStreamSelect("science")}
                >
                  {selectedStream === "science" ? "Selected" : "Select"}
                </Button>
              </div>
            </div>

            <div
              className={`stream-card rounded-xl overflow-hidden shadow-lg transition-all ${
                selectedStream === "commerce"
                  ? "ring-4 ring-stream-commerce"
                  : "hover:shadow-xl"
              }`}
              onClick={() => handleStreamSelect("commerce")}
            >
              <div className="bg-stream-commerce h-3"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Commerce
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover courses in Business, Finance, Accounting, and more.
                </p>
                <Button
                  variant={selectedStream === "commerce" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleStreamSelect("commerce")}
                >
                  {selectedStream === "commerce" ? "Selected" : "Select"}
                </Button>
              </div>
            </div>

            <div
              className={`stream-card rounded-xl overflow-hidden shadow-lg transition-all ${
                selectedStream === "arts"
                  ? "ring-4 ring-stream-arts"
                  : "hover:shadow-xl"
              }`}
              onClick={() => handleStreamSelect("arts")}
            >
              <div className="bg-stream-arts h-3"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Arts</h3>
                <p className="text-gray-600 mb-4">
                  Find courses in Humanities, Design, Media, and more.
                </p>
                <Button
                  variant={selectedStream === "arts" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleStreamSelect("arts")}
                >
                  {selectedStream === "arts" ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Recommendations Section */}
      {selectedStream && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                Recommended Courses for{" "}
                <span
                  className={`capitalize ${
                    selectedStream === "science"
                      ? "text-stream-science"
                      : selectedStream === "commerce"
                      ? "text-stream-commerce"
                      : "text-stream-arts"
                  }`}
                >
                  {selectedStream}
                </span>{" "}
                Stream
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore these courses that are popular choices for {selectedStream} stream students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {streamCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Duration:</span> {course.duration}
                      </div>
                    </div>
                    <Link to={`/course/${course.id}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to={`/stream/${selectedStream}`}>
                <Button variant="outline">
                  View All {selectedStream.charAt(0).toUpperCase() + selectedStream.slice(1)} Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
              Why Choose UniPathway?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive resources to help you make informed decisions about your education and career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Stream-Based Recommendations
              </h3>
              <p className="text-gray-600">
                Get personalized course recommendations based on your preferred academic stream.
              </p>
            </div>

            <div className="p-6 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-stream-commerce"
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Comprehensive College Information
              </h3>
              <p className="text-gray-600">
                Access detailed information about colleges, including admission fees, placements, and more.
              </p>
            </div>

            <div className="p-6 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-stream-arts"
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Job Recommendations
              </h3>
              <p className="text-gray-600">
                Discover job opportunities that match your skills, interests, and educational background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-heading text-white mb-4">
              Ready to Find Your Path?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Create an account to save your preferences and get personalized recommendations.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register">
                <Button size="lg" variant="secondary">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                  Browse All Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
