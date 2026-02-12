import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Map, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  LayoutDashboard,
  Palette,
  FolderTree,
  Package,
  FileText,
  HelpCircle,
  Layout,
  Settings,
  Globe,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Guide = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, title: "First Login", icon: LayoutDashboard, color: "bg-blue-500" },
    { id: 2, title: "Site Branding", icon: Palette, color: "bg-purple-500" },
    { id: 3, title: "Categories", icon: FolderTree, color: "bg-green-500" },
    { id: 4, title: "Products", icon: Package, color: "bg-orange-500" },
    { id: 5, title: "Page Content", icon: FileText, color: "bg-pink-500" },
    { id: 6, title: "FAQs", icon: HelpCircle, color: "bg-yellow-500" },
    { id: 7, title: "Footer", icon: Layout, color: "bg-indigo-500" },
    { id: 8, title: "Settings", icon: Settings, color: "bg-slate-500" },
    { id: 9, title: "Custom Domain", icon: Globe, color: "bg-cyan-500" },
  ];

  const scrollToSection = (id) => {
    setActiveStep(id);
    const element = document.getElementById(`step-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
          <Map className="w-4 h-4" />
          <span>Start Here</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Setup Roadmap</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Follow this step-by-step guide to get your store completely set up and ready for launch.
        </p>
      </div>

      {/* Visual Roadmap */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden lg:block" />
        <div className="grid grid-cols-3 lg:grid-cols-9 gap-4 relative z-10">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => scrollToSection(step.id)}
                className={`flex flex-col items-center gap-3 group transition-all duration-300 ${
                  isActive ? "scale-110" : "hover:scale-105"
                }`}
              >
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isActive ? step.color + " text-white ring-4 ring-offset-2 ring-blue-50" : "bg-white text-gray-400 border-2 border-gray-100 group-hover:border-blue-200"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-semibold text-center ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                  {step.id}. {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-6 h-fit space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Quick Navigation</p>
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => scrollToSection(step.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeStep === step.id 
                  ? "bg-blue-50 text-blue-700 shadow-sm" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${activeStep === step.id ? "bg-blue-500" : "bg-gray-300"}`} />
              {step.title}
            </button>
          ))}
        </div>

        {/* Content Content */}
        <div className="lg:col-span-9 space-y-12">
          
          {/* Step 1: Login */}
          <section id="step-1" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">1</div>
              <h2 className="text-2xl font-bold text-gray-900">First Login</h2>
            </div>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <p className="text-gray-600 mb-6">Access your backoffice dashboard using your registered credentials.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-5 border">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Login URL
                  </h3>
                  <code className="text-sm bg-white px-3 py-1 rounded border block w-fit mb-4">
                    https://your-subdomain.nutriprofits.com/backoffice
                  </code>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between border-b pb-2">
                      <span>Email</span>
                      <span className="font-medium text-gray-900">Your registered email</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Password</span>
                      <span className="font-medium text-gray-900">Your password</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                  <h3 className="font-semibold text-green-800 mb-3">Checklist</h3>
                  <ul className="space-y-2">
                    {["Open login URL", "Enter credentials", "Click Login", "View Dashboard"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-green-700 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Branding */}
          <section id="step-2" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">2</div>
              <h2 className="text-2xl font-bold text-gray-900">Site Branding</h2>
            </div>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <p className="text-gray-600 mb-6">Establish your visual identity with logo, colors, and favicon.</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">What to Configure</h3>
                  <div className="space-y-3">
                    {[
                      { l: "Site Name", d: "Your store name (e.g., GreenLife Stores)" },
                      { l: "Logo", d: "PNG/JPG (Max 2MB)" },
                      { l: "Primary Color", d: "Main brand color" },
                      { l: "Secondary Color", d: "Accent color" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                        <div>
                          <span className="block font-medium text-sm text-gray-900">{item.l}</span>
                          <span className="text-xs text-gray-500">{item.d}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link to="/backoffice/site-branding">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                        Go to Branding Settings <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl" />
                 <div className="relative p-6 space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">Logo</div>
                      <div>
                        <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                        <div className="h-3 w-20 bg-gray-100 rounded" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded bg-blue-500 shadow-sm" title="Primary" />
                      <div className="h-8 w-8 rounded bg-gray-800 shadow-sm" title="Secondary" />
                    </div>
                 </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Categories */}
          <section id="step-3" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">3</div>
              <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
            </div>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <p className="text-gray-600 mb-6">Organize your products into easy-to-browse categories.</p>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold mt-0.5">1</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Add New Category</h4>
                      <p className="text-sm text-gray-500">Click the + Add button in the Categories page.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold mt-0.5">2</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Fill Details</h4>
                      <p className="text-sm text-gray-500">Name is required. Image is recommended for better visuals.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold mt-0.5">3</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Save</h4>
                      <p className="text-sm text-gray-500">Your category is now ready for products.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center border border-dashed border-gray-300">
                  <FolderTree className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 mb-4">Ready to start organizing?</p>
                  <Link to="/backoffice/categories">
                    <Button variant="outline">
                      Manage Categories
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Products */}
          <section id="step-4" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl">4</div>
              <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            </div>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
             <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium">
                  <tr>
                    <th className="p-3 rounded-l-lg">Field</th>
                    <th className="p-3">Requirement</th>
                    <th className="p-3 rounded-r-lg">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="group hover:bg-gray-50">
                    <td className="p-3 font-medium">Product Name</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">Required</span></td>
                    <td className="p-3 text-gray-500">Use clear, descriptive names</td>
                  </tr>
                  <tr className="group hover:bg-gray-50">
                    <td className="p-3 font-medium">Price</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">Required</span></td>
                    <td className="p-3 text-gray-500">Set competitive pricing</td>
                  </tr>
                  <tr className="group hover:bg-gray-50">
                    <td className="p-3 font-medium">Image</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">Required</span></td>
                    <td className="p-3 text-gray-500">High quality, square aspect ratio preferred</td>
                  </tr>
                  <tr className="group hover:bg-gray-50">
                    <td className="p-3 font-medium">Category</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">Required</span></td>
                    <td className="p-3 text-gray-500">Organize for better discovery</td>
                  </tr>
                </tbody>
              </table>
             </div>
             <div className="mt-6 flex justify-end">
                <Link to="/backoffice/products">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Go to Products
                  </Button>
                </Link>
             </div>
            </div>
          </section>

          {/* Step 5: Page Content */}
          <section id="step-5" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xl">5</div>
              <h2 className="text-2xl font-bold text-gray-900">Page Content</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "About Content", desc: "Tell your story, mission, and vision.", link: "/backoffice/about" },
                { title: "Contact Info", desc: "Add email, phone, address, and map.", link: "/backoffice/contact" },
                { title: "Product Page", desc: "Customize layouts and hero sections.", link: "/backoffice/product/page-content" },
                { title: "Category Page", desc: "Set up banners and descriptions.", link: "/backoffice/categories/page-content" },
              ].map((page, i) => (
                <Link key={i} to={page.link} className="bg-white p-5 rounded-xl border hover:border-pink-200 hover:shadow-md transition cursor-pointer block">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{page.title}</h3>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">{page.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Step 6: FAQs */}
          <section id="step-6" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-xl">6</div>
              <h2 className="text-2xl font-bold text-gray-900">FAQs</h2>
            </div>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <p className="text-gray-600 mb-4">Add frequently asked questions to help your customers.</p>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Tip:</strong> Good FAQs can reduce support inquiries by up to 30%. Include shipping times, return policies, and product usage tips.
                </p>
              </div>
              <Link to="/backoffice/faqs">
                <Button variant="outline" className="w-full sm:w-auto">
                  Manage FAQs
                </Button>
              </Link>
            </div>
          </section>

          {/* Step 7: Footer */}
          <section id="step-7" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">7</div>
              <h2 className="text-2xl font-bold text-gray-900">Footer</h2>
            </div>
            <div className="bg-white rounded-xl border p-6 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <p className="text-gray-600 mb-4">Configure the bottom section of your website.</p>
                <ul className="text-sm space-y-2 text-gray-500 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Company Description</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Social Media Links</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Copyright Text</li>
                </ul>
                <Link to="/backoffice/footer-content">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Configure Footer
                  </Button>
                </Link>
              </div>
              <div className="w-full md:w-1/2 bg-gray-900 rounded-lg p-6 text-gray-400 text-xs">
                <div className="flex justify-between mb-8">
                  <div className="w-1/3 space-y-2">
                    <div className="h-2 w-12 bg-gray-700 rounded" />
                    <div className="h-2 w-24 bg-gray-800 rounded" />
                    <div className="h-2 w-20 bg-gray-800 rounded" />
                  </div>
                  <div className="w-1/3 space-y-2">
                    <div className="h-2 w-12 bg-gray-700 rounded" />
                    <div className="h-2 w-full bg-gray-800 rounded" />
                    <div className="h-2 w-full bg-gray-800 rounded" />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-800 text-center">
                  © 2026 Your Company
                </div>
              </div>
            </div>
          </section>

          {/* Step 9: Custom Domain */}
          <section id="step-9" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold text-xl">9</div>
              <h2 className="text-2xl font-bold text-gray-900">Custom Domain</h2>
            </div>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">DNS Configuration</h3>
                  <p className="text-sm text-gray-500 mb-6">Add these records to your domain registrar (GoDaddy, Namecheap, etc.)</p>
                  
                  <div className="border rounded-lg overflow-hidden mb-6">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-600 text-left">
                        <tr>
                          <th className="p-3 font-medium">Type</th>
                          <th className="p-3 font-medium">Name</th>
                          <th className="p-3 font-medium">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-3 font-mono">CNAME</td>
                          <td className="p-3 font-mono">www</td>
                          <td className="p-3 font-mono text-gray-500">your-subdomain.nutriprofits.com</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono">A</td>
                          <td className="p-3 font-mono">@</td>
                          <td className="p-3 font-mono text-gray-500">[System IP Address]</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <Link to="/backoffice/domain">
                    <Button variant="outline">
                      Go to Domain Settings
                    </Button>
                  </Link>
                </div>
                <div className="bg-cyan-50 p-6 rounded-xl md:w-80">
                  <h4 className="font-semibold text-cyan-900 mb-3">Setup Process</h4>
                  <ol className="space-y-4 relative border-l-2 border-cyan-200 ml-2 pl-4">
                    <li className="relative">
                      <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-cyan-100" />
                      <p className="text-sm font-medium text-cyan-900">Add Domain</p>
                      <p className="text-xs text-cyan-700">Enter domain in settings</p>
                    </li>
                    <li className="relative">
                      <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-cyan-100" />
                      <p className="text-sm font-medium text-cyan-900">Configure DNS</p>
                      <p className="text-xs text-cyan-700">Update registrar records</p>
                    </li>
                    <li className="relative">
                      <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-cyan-100" />
                      <p className="text-sm font-medium text-cyan-900">Verify</p>
                      <p className="text-xs text-cyan-700">Wait 24-48h for propagation</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Help Footer */}
          <div className="mt-16 bg-gray-900 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Extra Help?</h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Our support team is available to assist you with any questions or technical issues you might encounter during setup.
            </p>
            <Link to="/backoffice/contact">
              <Button className="bg-white text-gray-900 hover:bg-gray-100">
                Contact Support
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Guide;