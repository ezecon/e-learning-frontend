import React from 'react';

export default function Footer(){
  return (
    <footer className="bg-gray-50 text-gray-700 p-8 mt-8 border-t">
      <div className="container mx-auto grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold mb-2">About</h4>
          <p>Learning platform built with React + Laravel.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>Teachers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Contact</h4>
          <p>email@example.com</p>
        </div>
      </div>
    </footer>
  );
}