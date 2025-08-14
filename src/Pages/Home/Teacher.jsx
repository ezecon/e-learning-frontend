import { useEffect, useState } from "react";
import api from "../../context/axios";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    api.get("/teachers").then((res) => setTeachers(res.data));
  }, []);

  return (
    <div className="p-10 grid md:grid-cols-3 gap-6">
      {teachers.map((t) => (
        <div key={t.id} className="text-center bg-white shadow p-4 rounded">
          <img src={t.photo_url} alt={t.name} className="w-24 h-24 rounded-full mx-auto" />
          <h4 className="mt-2 font-semibold">{t.name}</h4>
        </div>
      ))}
    </div>
  );
}
