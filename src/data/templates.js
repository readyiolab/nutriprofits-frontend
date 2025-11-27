// Template configuration - will connect to backend later
export const templatesData = [
  {
    id: "template1",
    logoUrl: "/assets/logos/modern-business-logo.png",
    description: "Clean and modern design with gradient effects",
    thumbnail: "/templates/template1-thumb.jpg",
    colors: {
      primary: "#3B82F6",
      secondary: "#8B5CF6",
    }
  },
  {
    id: "template2",
    logoUrl: "/assets/logos/classic-professional-logo.png",
    description: "Traditional professional layout",
    thumbnail: "/templates/template2-thumb.jpg",
    colors: {
      primary: "#1F2937",
      secondary: "#F59E0B",
    },
    comingSoon: false,
  },
  {
    id: "template3",
    logoUrl: "/assets/logos/minimal-elegant-logo.png",
    description: "Simple and elegant design",
    thumbnail: "/templates/template3-thumb.jpg",
    colors: {
      primary: "#000000",
      secondary: "#FF0000",
    },
    comingSoon: false,
  },
];

export const getTemplateById = (id) => {
  return templatesData.find(template => template.id === id);
};