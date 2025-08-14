import { useEffect, useState } from "react";
import api from "../../context/axios";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    api.get("/gallery").then((res) => setGallery(res.data));
  }, []);

  return (
    <div className="p-10 grid md:grid-cols-3 gap-6">
      {gallery.map((g) => (
        <img key={g.id} src={g.image_url} alt="Gallery" className="w-full h-40 object-cover rounded" />
      ))}
    </div>
  );
}
