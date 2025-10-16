"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Plus, Edit, X } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const [categories, setCategories] = useState([
    "Food & Dining",
    "Transportation",
    "Entertainment",
    "Education",
    "Shopping",
    "Health",
    "Bills & Utilities",
    "Other",
  ]);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    if (categories.includes(newCategory.trim())) {
      toast.error("Category already exists");
      return;
    }

    setCategories([...categories, newCategory.trim()]);
    setNewCategory("");
    toast.success("Category added successfully");
  };

  const handleEditCategory = (oldName: string) => {
    if (!editValue.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    if (categories.includes(editValue.trim()) && editValue !== oldName) {
      toast.error("Category already exists");
      return;
    }

    setCategories(categories.map((cat) => (cat === oldName ? editValue.trim() : cat)));
    setEditingCategory(null);
    setEditValue("");
    toast.success("Category updated successfully");
  };

  const handleDeleteCategory = (categoryName: string) => {
    setCategories(categories.filter((cat) => cat !== categoryName));
    toast.success("Category deleted successfully");
  };

  const handleClearAllExpenses = () => {
    toast.success("All expenses cleared successfully");
  };

  return (
    <div className="space-y-8">
      {/* Category Management */}
      <Card className="bg-gradient-to-br from-indigo-50 via-sky-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-none shadow-lg transition-all hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-heading bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Manage Categories
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Add, edit, or remove your expense categories
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Add New Category */}
          <div className="flex gap-2">
            <Input
              placeholder="New category name..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
              className="bg-white/60 dark:bg-slate-800/50 backdrop-blur border border-slate-200 dark:border-slate-700"
            />
            <Button
              onClick={handleAddCategory}
              className="bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 transition-all shadow-md text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {/* Category List */}
          <div className="space-y-2">
            <Label className="text-lg font-semibold">Current Categories</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center justify-between p-3 border rounded-xl bg-white/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:shadow-md transition-all"
                >
                  {editingCategory === category ? (
                    <div className="flex gap-2 flex-1">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleEditCategory(category)
                        }
                        autoFocus
                        className="bg-white/70 dark:bg-slate-800/50"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingCategory(null);
                          setEditValue("");
                        }}
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="font-medium text-slate-700 dark:text-slate-200 font-heading">
                        {category}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingCategory(category);
                            setEditValue(category);
                          }}
                          className="hover:bg-indigo-100 dark:hover:bg-slate-700"
                        >
                          <Edit className="h-4 w-4 text-indigo-500" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-red-100 dark:hover:bg-slate-700"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Category</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete &ldquo;{category}&ldquo;? This
                                cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCategory(category)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-gradient-to-br from-red-50 via-orange-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-none shadow-lg hover:shadow-xl transition-all">
        <CardHeader>
          <CardTitle className="text-3xl font-heading bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Danger Zone
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Irreversible actions that affect your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-xl bg-red-50/70 dark:bg-red-950/40 backdrop-blur">
            <div>
              <h3 className="font-semibold text-red-700 dark:text-red-300">
                Clear All Expenses
              </h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete all your expense records
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-md transition-all">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your expenses and cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearAllExpenses}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Yes, delete everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
