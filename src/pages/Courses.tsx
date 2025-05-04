
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course, StreamType } from "@/lib/types";
import { courses } from "@/lib/mockData";

const Courses = () => {
  const [keyword, setKeyword] = useState("");
  const [stream, setStream] = useState<StreamType | "all">("all");
  const [duration, setDuration] = useState("any");
  const [coursesList, setCourses] = useState<Course[]>(courses);
  const [activeTab, setActiveTab] = useState<StreamType | "all">("all");

  const handleSearch = () => {
    const filtered = courses.filter((course) => {
      const matchesKeyword = keyword
        ? course.title.toLowerCase().includes(keyword.toLowerCase()) ||
          course.description.toLowerCase().includes(keyword.toLowerCase())
        : true;
      
      const matchesStream = stream !== "all"
        ? course.stream === stream
        : true;
      
      const matchesDuration = duration !== "any"
        ? course.duration.includes(duration)
        : true;

      return matchesKeyword && matchesStream && matchesDuration;
    });

    setCourses(filtered);
  };

  const clearFilters = () => {
    setKeyword("");
    setStream("all");
    setDuration("any");
    setCourses(courses);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as StreamType | "all");
    if (value === "all") {
      setCourses(courses);
    } else {
      setCourses(
        courses.filter(course => course.stream === value)
      );
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-heading text-gray-900">
              Explore Courses
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect educational path that aligns with your interests and career goals.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="grid grid-cols-4 max-w-md mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="commerce">Commerce</TabsTrigger>
            <TabsTrigger value="arts">Arts</TabsTrigger>
          </TabsList>
        </Tabs>
        
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
                      placeholder="Course name or keyword"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stream">Stream</Label>
                    <Select 
                      value={stream} 
                      onValueChange={(value) => setStream(value as StreamType | "all")}
                    >
                      <SelectTrigger id="stream">
                        <SelectValue placeholder="Select stream" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Streams</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="commerce">Commerce</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Duration</SelectItem>
                        <SelectItem value="1 year">1 Year</SelectItem>
                        <SelectItem value="2 years">2 Years</SelectItem>
                        <SelectItem value="3 years">3 Years</SelectItem>
                        <SelectItem value="4 years">4 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2 space-y-3">
                    <Button
                      className="w-full"
                      onClick={handleSearch}
                    >
                      Search Courses
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

          {/* Course Listings */}
          <div className="lg:col-span-3 animate-fade-in animate-delay-200">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Course Listings
                </h2>
                <div className="text-gray-600">
                  {coursesList.length} course{coursesList.length !== 1 ? "s" : ""} found
                </div>
              </div>
            </div>

            {coursesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesList.map((course) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-transparent hover:border-primary"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div
                        className={`text-xs font-semibold inline-block px-2 py-1 rounded mb-2 ${
                          course.stream === "science"
                            ? "bg-blue-100 text-blue-800"
                            : course.stream === "commerce"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {course.stream.charAt(0).toUpperCase() + course.stream.slice(1)}
                      </div>
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
                      <Button className="w-full">View Details</Button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No Courses Found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any courses matching your search criteria. Try adjusting your filters or search for something else.
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

export default Courses;
