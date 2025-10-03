import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [module, setModule] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/").then(res => {
      setModule(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{module?.module}</h2>
      <ul className="list-disc pl-6 mt-3">
        {module?.items.map((item, index) => (
          <li key={index} className="py-1">{item}</li>
        ))}
      </ul>
    </div>
  );
}
export default Home;
