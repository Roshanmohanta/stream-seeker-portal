
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
import { College } from "@/lib/types";
import { getMockColleges } from "@/lib/mockData";

const Colleges = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("all");
  const [colleges, setColleges] = useState<College[]>(getMockColleges());

  const handleSearch = () => {
    const filtered = getMockColleges().filter(college => {
      const matchesKeyword = keyword 
        ? college.name.toLowerCase().includes(keyword.toLowerCase()) ||
          college.description.toLowerCase().includes(keyword.toLowerCase())
        : true;
      
      const matchesLocation = location
        ? college.location.toLowerCase().includes(location.toLowerCase())
        : true;
      
      const matchesType = type !== "all"
        ? college.type === type
        : true;

      return matchesKeyword && matchesLocation && matchesType;
    });

    setColleges(filtered);
  };

  const clearFilters = () => {
    setKeyword("");
    setLocation("");
    setType("all");
    setColleges(getMockColleges());
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-heading text-gray-900">
              Explore Colleges
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect college to pursue your educational goals and build your career.
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
                      placeholder="College name or keyword"
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
                    <Label htmlFor="type">College Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select college type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Public">Public</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                        <SelectItem value="Deemed">Deemed</SelectItem>
                        <SelectItem value="Autonomous">Autonomous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2 space-y-3">
                    <Button
                      className="w-full"
                      onClick={handleSearch}
                    >
                      Search Colleges
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

          {/* College Listings */}
          <div className="lg:col-span-3 animate-fade-in animate-delay-200">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  College Listings
                </h2>
                <div className="text-gray-600">
                  {colleges.length} college{colleges.length !== 1 ? "s" : ""} found
                </div>
              </div>
            </div>

            {colleges.length > 0 ? (
              <div className="space-y-6">
                {colleges.map((college) => (
                  <div
                    key={college.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all border border-transparent hover:border-primary"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="md:col-span-1">
                        <img
                          src={college.image}
                          alt={college.name}
                          className="h-full w-full object-cover md:h-60"
                        />
                      </div>
                      <div className="md:col-span-2 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {college.name}
                        </h3>
                        <div className="flex flex-wrap items-center text-gray-500 mb-4">
                          <span className="flex items-center mr-4">
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
                          </span>
                          <span className="flex items-center mr-4">
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
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                            {college.type} College
                          </span>
                          <span className="flex items-center">
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
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                              />
                            </svg>
                            Fees: {college.fees}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {college.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {college.ranking && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Ranking: {college.ranking}
                            </span>
                          )}
                          {college.accreditation && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {college.accreditation}
                            </span>
                          )}
                        </div>

                        <Link to={`/college/${college.id}`}>
                          <Button>View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No Colleges Found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any colleges matching your search criteria. Try adjusting your filters or search for something else.
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

export default Colleges;
