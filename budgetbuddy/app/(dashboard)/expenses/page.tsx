"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";

const ExpensesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");

  // Mock data - will be replaced with real data from your database
  const expenses = [
    {
      id: "1",
      name: "Lunch at Campus Cafe",
      amount: 12.5,
      category: "Food & Dining",
      date: new Date("2025-10-10"),
      description: "Pizza and drink",
    },
    {
      id: "2",
      name: "Bus Pass",
      amount: 45.0,
      category: "Transportation",
      date: new Date("2025-10-09"),
      description: "Monthly pass",
    },
    {
      id: "3",
      name: "Movie Tickets",
      amount: 20.0,
      category: "Entertainment",
      date: new Date("2025-10-08"),
      description: "Weekend movie",
    },
    {
      id: "4",
      name: "Textbooks",
      amount: 150.0,
      category: "Education",
      date: new Date("2025-10-07"),
      description: "Math and Physics books",
    },
    {
      id: "5",
      name: "Coffee",
      amount: 5.5,
      category: "Food & Dining",
      date: new Date("2025-10-06"),
      description: "Morning coffee",
    },
  ];

  const categories = [
    "Food & Dining",
    "Transportation",
    "Entertainment",
    "Education",
    "Shopping",
    "Health",
    "Bills & Utilities",
    "Other",
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Food & Dining":
        "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
      Transportation:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
      Entertainment:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
      Education:
        "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
      Shopping:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
      Health:
        "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || expense.category === categoryFilter;
    const matchesAmount =
      amountFilter === "all" ||
      (amountFilter === "low" && expense.amount < 20) ||
      (amountFilter === "medium" &&
        expense.amount >= 20 &&
        expense.amount < 100) ||
      (amountFilter === "high" && expense.amount >= 100);

    return matchesSearch && matchesCategory && matchesAmount;
  });

  return (
    <div className="space-y-8">
      <Card className="shadow-md border-border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-heading tracking-tight">
            All Expenses
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-sans"
              />
            </div>

            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="font-sans">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={amountFilter}
              onValueChange={setAmountFilter}
            >
              <SelectTrigger className="font-sans">
                <SelectValue placeholder="Filter by amount" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Amounts</SelectItem>
                <SelectItem value="low">Under $20</SelectItem>
                <SelectItem value="medium">$20 - $100</SelectItem>
                <SelectItem value="high">Over $100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Expenses Table */}
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8"
                    >
                      <p className="text-muted-foreground font-sans">
                        No expenses found
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense) => (
                    <TableRow
                      key={expense.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium font-sans">
                            {expense.name}
                          </p>
                          {expense.description && (
                            <p className="text-sm text-muted-foreground">
                              {expense.description}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getCategoryColor(
                            expense.category
                          )} font-sans border`}
                        >
                          {expense.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-sans">
                        {format(expense.date, "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell className="text-right font-medium font-sans">
                        ${expense.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-primary/10"
                          >
                            <Edit className="h-4 w-4 text-primary" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Summary */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground font-sans">
              Showing {filteredExpenses.length} of {expenses.length}{" "}
              expenses
            </p>
            <div className="text-right mt-3 md:mt-0">
              <p className="text-sm text-muted-foreground font-sans">
                Total
              </p>
              <p className="text-2xl font-heading font-bold text-primary">
                $
                {filteredExpenses
                  .reduce((sum, expense) => sum + expense.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesList;
