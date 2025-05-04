
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
import { College } from "@/lib/types";
import { colleges } from "@/lib/mockData";
import { useToast } from "@/components/ui/use-toast";

export default function AdminColleges() {
  const [collegeList, setCollegeList] = useState<College[]>(colleges);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCollege, setEditingCollege] = useState<College | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // New college form state
  const [newCollege, setNewCollege] = useState<Partial<College>>({
    name: "",
    courses: [],
    location: "",
    averageSalary: 0,
    admissionFees: 0,
    companies: [],
    applicationProcess: "",
    importantDates: {},
    image: "",
    rating: 0
  });

  const filteredColleges = collegeList.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCollege = () => {
    // In a real app, this would send data to API
    const collegeId = `college-${(collegeList.length + 1).toString().padStart(3, '0')}`;
    
    // Handle companies safely
    let companies: string[] = [];
    if (typeof newCollege.companies === 'string') {
      companies = (newCollege.companies as unknown as string).split(',').map(item => item.trim());
    } else if (Array.isArray(newCollege.companies)) {
      companies = newCollege.companies;
    }
    
    // Handle courses safely
    let courses: string[] = [];
    if (typeof newCollege.courses === 'string') {
      courses = (newCollege.courses as unknown as string).split(',').map(item => item.trim());
    } else if (Array.isArray(newCollege.courses)) {
      courses = newCollege.courses;
    }

    const importantDates = newCollege.importantDates || {};
      
    const college: College = {
      id: collegeId,
      name: newCollege.name || "",
      courses: courses,
      location: newCollege.location || "",
      averageSalary: Number(newCollege.averageSalary) || 0,
      admissionFees: Number(newCollege.admissionFees) || 0,
      companies: companies,
      applicationProcess: newCollege.applicationProcess || "",
      importantDates: importantDates,
      image: newCollege.image || "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      rating: Number(newCollege.rating) || 0
    };

    setCollegeList([...collegeList, college]);
    setIsAddDialogOpen(false);
    setNewCollege({
      name: "",
      courses: [],
      location: "",
      averageSalary: 0,
      admissionFees: 0,
      companies: [],
      applicationProcess: "",
      importantDates: {},
      image: "",
      rating: 0
    });

    toast({
      title: "College Added",
      description: `${college.name} has been successfully added.`,
    });
  };

  const handleEditCollege = () => {
    if (!editingCollege) return;
    
    // Handle companies safely
    let companies: string[] = [];
    if (typeof editingCollege.companies === 'string') {
      companies = (editingCollege.companies as unknown as string).split(',').map(item => item.trim());
    } else if (Array.isArray(editingCollege.companies)) {
      companies = editingCollege.companies;
    }
    
    // Handle courses safely
    let courses: string[] = [];
    if (typeof editingCollege.courses === 'string') {
      courses = (editingCollege.courses as unknown as string).split(',').map(item => item.trim());
    } else if (Array.isArray(editingCollege.courses)) {
      courses = editingCollege.courses;
    }

    const updatedCollege: College = {
      ...editingCollege,
      courses: courses,
      companies: companies,
      averageSalary: Number(editingCollege.averageSalary),
      admissionFees: Number(editingCollege.admissionFees),
      rating: Number(editingCollege.rating)
    };

    const updatedList = collegeList.map((college) =>
      college.id === updatedCollege.id ? updatedCollege : college
    );

    setCollegeList(updatedList);
    setIsEditDialogOpen(false);
    setEditingCollege(null);

    toast({
      title: "College Updated",
      description: `${updatedCollege.name} has been successfully updated.`,
    });
  };

  const handleDeleteCollege = () => {
    if (!editingCollege) return;

    const updatedList = collegeList.filter((college) => college.id !== editingCollege.id);
    setCollegeList(updatedList);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "College Deleted",
      description: `${editingCollege.name} has been successfully deleted.`,
      variant: "destructive",
    });
    
    setEditingCollege(null);
  };

  const handleNewCollegeChange = (field: string, value: string) => {
    if (field === 'companies') {
      // Handle companies as an array
      const companiesArray = value.split(',').map(item => item.trim());
      setNewCollege((prev) => ({ ...prev, [field]: companiesArray }));
    } else if (field === 'courses') {
      // Handle courses as an array
      const coursesArray = value.split(',').map(item => item.trim());
      setNewCollege((prev) => ({ ...prev, [field]: coursesArray }));
    } else {
      setNewCollege((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEditingCollegeChange = (field: string, value: string) => {
    if (!editingCollege) return;
    
    if (field === 'companies') {
      // Handle companies as an array
      const companiesArray = value.split(',').map(item => item.trim());
      setEditingCollege({ ...editingCollege, [field]: companiesArray });
    } else if (field === 'courses') {
      // Handle courses as an array
      const coursesArray = value.split(',').map(item => item.trim());
      setEditingCollege({ ...editingCollege, [field]: coursesArray });
    } else {
      setEditingCollege({ ...editingCollege, [field]: value });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-heading">Manage Colleges</h1>
          <p className="text-gray-600">Add, edit, or remove colleges from the platform.</p>
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
              Add College
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New College</DialogTitle>
              <DialogDescription>
                Enter the details for the new college. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  College Name
                </label>
                <Input
                  id="name"
                  value={newCollege.name}
                  onChange={(e) => handleNewCollegeChange("name", e.target.value)}
                  placeholder="e.g., Harvard University"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  value={newCollege.location}
                  onChange={(e) => handleNewCollegeChange("location", e.target.value)}
                  placeholder="e.g., Cambridge, MA"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="averageSalary" className="text-sm font-medium">
                    Average Salary ($)
                  </label>
                  <Input
                    id="averageSalary"
                    type="number"
                    value={newCollege.averageSalary}
                    onChange={(e) => handleNewCollegeChange("averageSalary", e.target.value)}
                    placeholder="e.g., 85000"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="admissionFees" className="text-sm font-medium">
                    Admission Fees ($)
                  </label>
                  <Input
                    id="admissionFees"
                    type="number"
                    value={newCollege.admissionFees}
                    onChange={(e) => handleNewCollegeChange("admissionFees", e.target.value)}
                    placeholder="e.g., 50000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="courses" className="text-sm font-medium">
                  Courses (comma-separated IDs)
                </label>
                <Input
                  id="courses"
                  value={Array.isArray(newCollege.courses) ? newCollege.courses.join(", ") : ""}
                  onChange={(e) => handleNewCollegeChange("courses", e.target.value)}
                  placeholder="e.g., course-001, course-002"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="companies" className="text-sm font-medium">
                  Hiring Companies (comma-separated)
                </label>
                <Input
                  id="companies"
                  value={Array.isArray(newCollege.companies) ? newCollege.companies.join(", ") : ""}
                  onChange={(e) => handleNewCollegeChange("companies", e.target.value)}
                  placeholder="e.g., Google, Microsoft, Amazon"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="applicationProcess" className="text-sm font-medium">
                  Application Process
                </label>
                <textarea
                  id="applicationProcess"
                  value={newCollege.applicationProcess}
                  onChange={(e) => handleNewCollegeChange("applicationProcess", e.target.value)}
                  placeholder="Describe the application process"
                  className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    Image URL
                  </label>
                  <Input
                    id="image"
                    value={newCollege.image}
                    onChange={(e) => handleNewCollegeChange("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="rating" className="text-sm font-medium">
                    Rating (0-5)
                  </label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={newCollege.rating}
                    onChange={(e) => handleNewCollegeChange("rating", e.target.value)}
                    placeholder="e.g., 4.5"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCollege}>Save College</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center">
        <Input
          placeholder="Search colleges..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="text-sm text-gray-500">
          {filteredColleges.length} {filteredColleges.length === 1 ? "college" : "colleges"} found
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredColleges.length > 0 ? (
              filteredColleges.map((college) => (
                <TableRow key={college.id}>
                  <TableCell className="font-medium">{college.name}</TableCell>
                  <TableCell>{college.location}</TableCell>
                  <TableCell>{college.rating} / 5</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingCollege(college);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setEditingCollege(college);
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
                  No colleges found matching your search
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit College Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit College</DialogTitle>
            <DialogDescription>
              Make changes to the college details below.
            </DialogDescription>
          </DialogHeader>
          {editingCollege && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  College Name
                </label>
                <Input
                  id="edit-name"
                  value={editingCollege.name}
                  onChange={(e) => handleEditingCollegeChange("name", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="edit-location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="edit-location"
                  value={editingCollege.location}
                  onChange={(e) => handleEditingCollegeChange("location", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="edit-averageSalary" className="text-sm font-medium">
                    Average Salary ($)
                  </label>
                  <Input
                    id="edit-averageSalary"
                    type="number"
                    value={editingCollege.averageSalary}
                    onChange={(e) => handleEditingCollegeChange("averageSalary", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="edit-admissionFees" className="text-sm font-medium">
                    Admission Fees ($)
                  </label>
                  <Input
                    id="edit-admissionFees"
                    type="number"
                    value={editingCollege.admissionFees}
                    onChange={(e) => handleEditingCollegeChange("admissionFees", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="edit-courses" className="text-sm font-medium">
                  Courses (comma-separated IDs)
                </label>
                <Input
                  id="edit-courses"
                  value={Array.isArray(editingCollege.courses) ? editingCollege.courses.join(", ") : ""}
                  onChange={(e) => handleEditingCollegeChange("courses", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="edit-companies" className="text-sm font-medium">
                  Hiring Companies (comma-separated)
                </label>
                <Input
                  id="edit-companies"
                  value={Array.isArray(editingCollege.companies) ? editingCollege.companies.join(", ") : ""}
                  onChange={(e) => handleEditingCollegeChange("companies", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="edit-applicationProcess" className="text-sm font-medium">
                  Application Process
                </label>
                <textarea
                  id="edit-applicationProcess"
                  value={editingCollege.applicationProcess}
                  onChange={(e) => handleEditingCollegeChange("applicationProcess", e.target.value)}
                  className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="edit-image" className="text-sm font-medium">
                    Image URL
                  </label>
                  <Input
                    id="edit-image"
                    value={editingCollege.image}
                    onChange={(e) => handleEditingCollegeChange("image", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="edit-rating" className="text-sm font-medium">
                    Rating (0-5)
                  </label>
                  <Input
                    id="edit-rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={editingCollege.rating}
                    onChange={(e) => handleEditingCollegeChange("rating", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCollege}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete College Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete College</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this college? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {editingCollege && (
            <div className="py-4">
              <p className="font-medium">{editingCollege.name}</p>
              <p className="text-sm text-gray-500">{editingCollege.location}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCollege}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
