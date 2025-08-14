import React from 'react';

export default function GalleryItem({item}){
  return (
    <div className="rounded overflow-hidden">
      <img src={item.url || item.image || 'https://via.placeholder.com/400x250'} alt="gallery" className="w-full h-48 object-cover" />
    </div>
  );
}