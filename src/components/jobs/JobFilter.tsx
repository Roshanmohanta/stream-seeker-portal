
import { useState } from "react";
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

interface JobFilterProps {
  onFilter: (keyword: string, location: string, salary: string, industry: string, experience: string) => void;
  onClear: () => void;
}

const JobFilter = ({ onFilter, onClear }: JobFilterProps) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");

  const handleSearch = () => {
    onFilter(keyword, location, salary, industry, experience);
  };

  const handleClear = () => {
    setKeyword("");
    setLocation("");
    setSalary("");
    setIndustry("");
    setExperience("");
    onClear();
  };

  return (
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
              onClick={handleClear}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
