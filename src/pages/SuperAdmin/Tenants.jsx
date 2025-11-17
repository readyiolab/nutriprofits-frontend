// src/components/superadmin/Tenants.jsx
import React from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Palette,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Tenants() {
  const tenants = [
    {
      id: 1,
      name: "Acme Corp",
      email: "admin@acme.com",
      subdomain: "acme",
      users: 48,
      plan: "Pro",
      billing: "annual",
      price: "$490/yr",
      status: "active",
      template: "modern",        // modern / classic / minimal
      created: "2025-10-12",
    },
    {
      id: 2,
      name: "Beta Systems",
      email: "contact@beta.com",
      subdomain: "beta",
      users: 23,
      plan: "Starter",
      billing: "monthly",
      price: "$29/mo",
      status: "active",
      template: "classic",
      created: "2025-09-28",
    },
    {
      id: 3,
      name: "Gamma Ltd",
      email: "hello@gamma.com",
      subdomain: "gamma",
      users: 89,
      plan: "Enterprise",
      billing: "annual",
      price: "$1,990/yr",
      status: "inactive",
      template: "minimal",
      created: "2025-08-15",
    },
    {
      id: 4,
      name: "Delta Tech",
      email: "team@delta.com",
      subdomain: "delta",
      users: 156,
      plan: "Pro",
      billing: "monthly",
      price: "$59/mo",
      status: "active",
      template: "modern",
      created: "2025-11-01",
    },
  ];

  const getTemplateInfo = (template) => {
    switch (template) {
      case "modern":
        return { label: "Modern", color: "bg-purple-100 text-purple-700", icon: "M" };
      case "classic":
        return { label: "Classic", color: "bg-blue-100 text-blue-700", icon: "C" };
      case "minimal":
        return { label: "Minimal", color: "bg-gray-100 text-gray-700", icon: "S" };
      default:
        return { label: "None", color: "bg-gray-100 text-gray-600", icon: "?" };
    }
  };

  const getStatusBadge = (status) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge variant="secondary">
        <Clock className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Tenants</h1>
          <p className="text-gray-500 mt-1">Manage your multi-tenant customers</p>
        </div>
        
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search tenants by name, email or subdomain..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Tenant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subdomain</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Plan & Pricing</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => {
                const template = getTemplateInfo(tenant.template);

                return (
                  <TableRow key={tenant.id} className="hover:bg-gray-50">
                    {/* Tenant Name + Avatar */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        
                        <div>
                          <div className="font-medium text-gray-900">{tenant.name}</div>
                          <div className="text-sm text-gray-500">ID: {tenant.id}</div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-gray-600">{tenant.email}</TableCell>

                    {/* Subdomain */}
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {tenant.subdomain}.yoursite.com
                      </code>
                    </TableCell>

                    {/* Users */}
                    <TableCell className="font-medium">{tenant.users}</TableCell>

                    {/* Plan & Pricing */}
                    <TableCell>
                      <div>
                        <Badge variant="secondary">{tenant.plan}</Badge>
                        <div className="text-sm text-gray-600 mt-1 font-medium">
                          {tenant.price}
                        </div>
                      </div>
                    </TableCell>

                    {/* Template Selection */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-gray-400" />
                        <Badge className={template.color}>
                          <span className="font-mono font-bold mr-1">{template.icon}</span>
                          {template.label}
                        </Badge>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>{getStatusBadge(tenant.status)}</TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Tenant</DropdownMenuItem>
                          <DropdownMenuItem>Change Template</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Suspend Tenant
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}