// src/components/superadmin/CreateUser.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Globe, Palette, Check } from "lucide-react";

const templates = [
  { id: "modern", name: "Modern", desc: "Bold, vibrant & feature-rich", price: "+$0", color: "border-purple-500" },
  { id: "classic", name: "Classic", desc: "Professional & trusted look", price: "+$0", color: "border-blue-500" },
  { id: "minimal", name: "Minimal", desc: "Clean, fast & distraction-free", price: "+$0", color: "border-gray-500" },
];

const plans = {
  starter: { name: "Starter", monthly: 29, annual: 290 },
  pro: { name: "Pro", monthly: 59, annual: 590 },
  enterprise: { name: "Enterprise", monthly: 199, annual: 1990 },
};

export default function CreateUser() {
  const [template, setTemplate] = useState("modern");
  const [plan, setPlan] = useState("pro");
  const [billing, setBilling] = useState("annual");

  const currentPrice = billing === "annual"
    ? plans[plan].annual
    : plans[plan].monthly;

  const priceLabel = billing === "annual"
    ? `$${currentPrice}/yr`
    : `$${currentPrice}/mo`;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Tenant</h1>
        <p className="text-gray-600 mt-2">Set up a new company with subdomain, template, and pricing plan</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Company Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="name" placeholder="Acme Corporation" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input id="email" type="email" placeholder="admin@acme.com" className="h-11" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="flex rounded-lg shadow-sm">
                  <Input
                    id="subdomain"
                    placeholder="acme"
                    className="rounded-r-none border-r-0 focus-visible:ring-0 h-11"
                  />
                  <span className="inline-flex items-center px-4 bg-gray-50 border border-gray-300 rounded-r-lg text-gray-600 font-medium">
                    .yoursite.com
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Choose Template
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={template} onValueChange={setTemplate}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map((t) => (
                    <Label
                      key={t.id}
                      htmlFor={t.id}
                      className={`relative flex flex-col p-5 border-2 rounded-xl cursor-pointer transition-all
                        ${template === t.id ? `${t.color} border-opacity-100 bg-opacity-5` : "border-gray-200 hover:border-gray-300"}
                      `}
                    >
                      <RadioGroupItem value={t.id} id={t.id} className="sr-only" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{t.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{t.desc}</p>
                        <span className="text-xs text-gray-500 mt-3 block">{t.price}</span>
                      </div>
                      {template === t.id && (
                        <Check className="absolute top-4 right-4 h-5 w-5 text-white bg-green-500 rounded-full p-0.5" />
                      )}
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar: Plan & Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Pricing Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={plan} onValueChange={setPlan}>
                {Object.entries(plans).map(([key, p]) => (
                  <Label
                    key={key}
                    htmlFor={key}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${plan === key ? "border-indigo-500 bg-indigo-50" : "border-gray-200"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={key} id={key} />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </Label>
                ))}
              </RadioGroup>

              {/* Billing Cycle */}
              <div className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className={`text-sm ${billing === "monthly" ? "font-semibold" : "text-gray-500"}`}>Monthly</span>
                <button
                  onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
                  className="relative w-14 h-8 bg-indigo-600 rounded-full transition-all"
                >
                  <span className={`absolute top-1 ${billing === "annual" ? "left-1" : "left-7"} w-6 h-6 bg-white rounded-full transition-all`} />
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${billing === "annual" ? "font-semibold" : "text-gray-500"}`}>Annual</span>
                  <Badge variant="secondary" className="text-xs">Save 20%</Badge>
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-5">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-2xl text-indigo-600">{priceLabel}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Template: <span className="font-medium capitalize">{template}</span> (Free)
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button size="lg" className="w-full">
                  Create Tenant
                </Button>
                <Button size="lg" variant="outline" className="w-full">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}