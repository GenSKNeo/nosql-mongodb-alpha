// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Home() {
//   const [module, setModule] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/").then(res => {
//       setModule(res.data);
//     });
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold">{module?.module}</h2>
//       <ul className="list-disc pl-6 mt-3">
//         {module?.items.map((item, index) => (
//           <li key={index} className="py-1">{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default Home;
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(res => {
        setModule(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {module?.module}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master MongoDB and non-relational databases with this comprehensive learning path
          </p>
        </div>

        {/* Learning Modules Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Learning Path
          </h2>
          
          <div className="grid gap-4">
            {module?.items.map((item, index) => (
              <div 
                key={index}
                className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                {/* Step Number */}
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                    {item}
                  </h3>
                </div>
                
                {/* Arrow */}
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-blue-600 mb-2">{module?.items.length}</div>
            <div className="text-gray-600">Learning Modules</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Practical Focus</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-purple-600 mb-2">MongoDB</div>
            <div className="text-gray-600">Database Technology</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;