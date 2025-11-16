import { Link } from "react-router-dom";
import { templatesData } from "../../data/templates";

const Templates = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Template</h1>
        <p className="text-gray-600 text-lg">
          Preview our professionally designed templates. Each has unique design!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templatesData.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
          >
            <div
              className="h-48 bg-gradient-to-br flex items-center justify-center text-white text-2xl font-bold"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${template.colors.primary}, ${template.colors.secondary})`
              }}
            >
              {template.name}
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              
              <div className="flex space-x-2 mb-4">
                {Object.values(template.colors).map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              
              <Link
                to={`/template/${template.id}`}
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold"
              >
                Preview Template →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;