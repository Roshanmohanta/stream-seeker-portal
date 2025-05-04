
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/lib/types";

export default function AdminProfile() {
  // In a real app, this would be fetched from an API
  const [profile, setProfile] = useState<User>({
    id: "admin-001",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    preferences: {
      stream: "science",
      interests: ["Technology", "Education", "Career Development"],
      location: "New York"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    // In a real app, this would send data to API
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "interests") {
      setProfile({
        ...profile,
        preferences: {
          ...profile.preferences,
          interests: value.split(",").map(item => item.trim())
        }
      });
    } else if (field.startsWith("preferences.")) {
      const preferencesField = field.split(".")[1];
      setProfile({
        ...profile,
        preferences: {
          ...profile.preferences,
          [preferencesField]: value
        }
      });
    } else {
      setProfile({
        ...profile,
        [field]: value
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading">Your Profile</h1>
          <p className="text-gray-600">
            Manage your account details and preferences.
          </p>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Account Information</h2>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          )}
        </div>

        <Form>
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                  value={profile.name} 
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  value={profile.email} 
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing || true} // Email is typically not editable
                />
              </FormControl>
              {isEditing && <FormDescription>
                Email address cannot be changed.
              </FormDescription>}
            </FormItem>

            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input 
                  value={profile.role} 
                  disabled={true} 
                />
              </FormControl>
              <FormDescription>
                Your role determines your permissions in the system.
              </FormDescription>
            </FormItem>

            <Separator />

            <h2 className="text-xl font-semibold pt-2">Preferences</h2>

            <FormItem>
              <FormLabel>Preferred Location</FormLabel>
              <FormControl>
                <Input 
                  value={profile.preferences?.location || ""} 
                  onChange={(e) => handleInputChange("preferences.location", e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., New York"
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Preferred Stream</FormLabel>
              <FormControl>
                <select
                  value={profile.preferences?.stream || ""}
                  onChange={(e) => handleInputChange("preferences.stream", e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="science">Science</option>
                  <option value="commerce">Commerce</option>
                  <option value="arts">Arts</option>
                </select>
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <Textarea 
                  value={profile.preferences?.interests?.join(", ") || ""}
                  onChange={(e) => handleInputChange("interests", e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., Technology, Education, Career Development"
                  className="min-h-[80px]"
                />
              </FormControl>
              {isEditing && <FormDescription>
                Enter your interests separated by commas.
              </FormDescription>}
            </FormItem>

            {isEditing && (
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
