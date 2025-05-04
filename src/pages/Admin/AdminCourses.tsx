import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course, StreamType } from "@/lib/types";
import { courses } from "@/lib/mockData";
import { useToast } from "@/components/ui/use-toast";

export default function AdminCourses() {
  const [courseList, setCourseList] = useState<Course[]>(courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // New course form state
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: "",
    stream: "science",
    description: "",
    duration: "",
    eligibility: "",
    careerProspects: [],
    image: "",
  });

  const filteredCourses = courseList.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.stream.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = () => {
    // In a real app, this would send data to API
    const courseId = `course-${(courseList.length + 1).toString().padStart(3, '0')}`;
    
    // Handle careerProspects safely
    let careerProspects: string[] = [];
    if (typeof newCourse.careerProspects === 'string') {
      careerProspects = newCourse.careerProspects.split(',').map(item => item.trim());
    } else if (Array.isArray(newCourse.careerProspects)) {
      careerProspects = newCourse.careerProspects;
    }
      
    const course: Course = {
      id: courseId,
      title: newCourse.title || "",
      stream: newCourse.stream as StreamType || "science",
      description: newCourse.description || "",
      duration: newCourse.duration || "",
      eligibility: newCourse.eligibility || "",
      careerProspects: careerProspects,
      image: newCourse.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    };

    setCourseList([...courseList, course]);
    setIsAddDialogOpen(false);
    setNewCourse({
      title: "",
      stream: "science",
      description: "",
      duration: "",
      eligibility: "",
      careerProspects: [],
      image: "",
    });

    toast({
      title: "Course Added",
      description: `${course.title} has been successfully added.`,
    });
  };

  const handleEditCourse = () => {
    if (!editingCourse) return;

    // Handle careerProspects safely
    let careerProspects: string[] = [];
    if (typeof editingCourse.careerProspects === 'string') {
      careerProspects = editingCourse.careerProspects.split(',').map(item => item.trim());
    } else if (Array.isArray(editingCourse.careerProspects)) {
      careerProspects = editingCourse.careerProspects;
    }

    const updatedCourse: Course = {
      ...editingCourse,
      careerProspects: careerProspects,
    };

    const updatedList = courseList.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    );

    setCourseList(updatedList);
    setIsEditDialogOpen(false);
    setEditingCourse(null);

    toast({
      title: "Course Updated",
      description: `${updatedCourse.title} has been successfully updated.`,
    });
  };

  const handleDeleteCourse = () => {
    if (!editingCourse) return;

    const updatedList = courseList.filter((course) => course.id !== editingCourse.id);
    setCourseList(updatedList);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Course Deleted",
      description: `${editingCourse.title} has been successfully deleted.`,
      variant: "destructive",
    });
    
    setEditingCourse(null);
  };

  const handleNewCourseChange = (field: string, value: string) => {
    if (field === 'careerProspects') {
      setNewCourse((prev) => ({ ...prev, [field]: value }));
    } else {
      setNewCourse((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEditingCourseChange = (field: string, value: string) => {
    if (!editingCourse) return;
    if (field === 'careerProspects') {
      setEditingCourse({ ...editingCourse, [field]: value });
    } else {
      setEditingCourse({ ...editingCourse, [field]: value });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-heading">Manage Courses</h1>
          <p className="text-gray-600">Add, edit, or remove courses from the platform.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Enter the details for the new course. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Course Title
                </label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e) => handleNewCourseChange("title", e.target.value)}
                  placeholder="e.g., Computer Science Engineering"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="stream" className="text-sm font-medium">
                  Stream
                </label>
                <Select 
                  value={newCourse.stream as string} 
                  onValueChange={(value) => handleNewCourseChange("stream", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => handleNewCourseChange("description", e.target.value)}
                  placeholder="Enter a detailed description of the course"
                  className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="duration" className="text-sm font-medium">
                    Duration
                  </label>
                  <Input
                    id="duration"
                    value={newCourse.duration}
                    onChange={(e) => handleNewCourseChange("duration", e.target.value)}
                    placeholder="e.g., 4 years"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    Image URL
                  </label>
                  <Input
                    id="image"
                    value={newCourse.image}
                    onChange={(e) => handleNewCourseChange("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="eligibility" className="text-sm font-medium">
                  Eligibility
                </label>
                <Input
                  id="eligibility"
                  value={newCourse.eligibility}
                  onChange={(e) => handleNewCourseChange("eligibility", e.target.value)}
                  placeholder="e.g., 10+2 with Math and Science"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="careerProspects" className="text-sm font-medium">
                  Career Prospects (comma-separated)
                </label>
                <Input
                  id="careerProspects"
                  value={newCourse.careerProspects?.join(", ")}
                  onChange={(e) => handleNewCourseChange("careerProspects", e.target.value)}
                  placeholder="e.g., Software Engineer, Data Analyst, Web Developer"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCourse}>Save Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center">
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="text-sm text-gray-500">
          {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} found
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead>Stream</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize 
                        ${
                          course.stream === "science"
                            ? "bg-blue-100 text-blue-800"
                            : course.stream === "commerce"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                    >
                      {course.stream}
                    </span>
                  </TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingCourse(course);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setEditingCourse(course);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No courses found matching your search
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Make changes to the course details below.
            </DialogDescription>
          </DialogHeader>
          {editingCourse && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="edit-title" className="text-sm font-medium">
                  Course Title
                </label>
                <Input
                  id="edit-title"
                  value={editingCourse.title}
                  onChange={(e) => handleEditingCourseChange("title", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="edit-stream" className="text-sm font-medium">
                  Stream
                </label>
                <Select 
                  value={editingCourse.stream} 
                  onValueChange={(value) => handleEditingCourseChange("stream", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="edit-description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={editingCourse.description}
                  onChange={(e) => handleEditingCourseChange("description", e.target.value)}
                  className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="edit-duration" className="text-sm font-medium">
                    Duration
                  </label>
                  <Input
                    id="edit-duration"
                    value={editingCourse.duration}
                    onChange={(e) => handleEditingCourseChange("duration", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="edit-image" className="text-sm font-medium">
                    Image URL
                  </label>
                  <Input
                    id="edit-image"
                    value={editingCourse.image}
                    onChange={(e) => handleEditingCourseChange("image", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="edit-eligibility" className="text-sm font-medium">
                  Eligibility
                </label>
                <Input
                  id="edit-eligibility"
                  value={editingCourse.eligibility}
                  onChange={(e) => handleEditingCourseChange("eligibility", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="edit-careerProspects" className="text-sm font-medium">
                  Career Prospects (comma-separated)
                </label>
                <Input
                  id="edit-careerProspects"
                  value={editingCourse.careerProspects.join(", ")}
                  onChange={(e) => handleEditingCourseChange("careerProspects", e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCourse}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Course Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {editingCourse && (
            <div className="py-4">
              <p className="font-medium">{editingCourse.title}</p>
              <p className="text-sm text-gray-500 capitalize">{editingCourse.stream} stream</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
