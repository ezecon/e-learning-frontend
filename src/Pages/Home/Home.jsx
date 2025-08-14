
import HeroSection  from "../../Components/HeroSection/HeroSection";
import Courses from "./Course";


export default function Home(){

  return (
    <div className="montserrat-alternates">
      <HeroSection />

      <section className="mb-20 py-8 montserrat-alternates">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-10 px-4">
       
              <div
                className="h-8 flex items-center justify-center opacity-70 hover:opacity-100 transition"
              >
                <img className="w-24" src={`https://cdn.vectorstock.com/i/500p/71/24/global-technology-logo-template-vector-40327124.jpg`} alt={`Logo`} />
              
              </div>
              <div
                className="h-8 flex items-center justify-center opacity-70 hover:opacity-100 transition"
              >
                <img className="w-24" src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxk2JHblOFkS5F0472fo6Xr2nw3dFNuXOn_13edO_6XloLOGG86P_D2v3MJYdt7GlD66I&usqp=CAU`} alt={`Logo`} />
              
              </div>
              <div
                className="h-8 flex items-center justify-center opacity-70 hover:opacity-100 transition"
              >
                <img className="w-24" src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl0iKX9i8sQiYo2OciA_5BB5ZqmgGgXy6bHMS58CSnXOynqUlaNQN754qWXUChnX8ASNI&usqp=CAU`} alt={`Logo`} />
              
              </div>
              <div
                className="h-8 flex items-center justify-center opacity-70 hover:opacity-100 transition"
              >
                <img className="w-24" src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwwX-L412IV7KmOPh8G0bk8aqYf5MIawwDXEjX6QxF_zFPYROfP52CQr0itoEwdFqmNn0&usqp=CAU`} alt={`Logo`} />
              
              </div>
              <div
                className="h-8 flex items-center justify-center opacity-70 hover:opacity-100 transition"
              >
                <img className="w-24" src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwwX-L412IV7KmOPh8G0bk8aqYf5MIawwDXEjX6QxF_zFPYROfP52CQr0itoEwdFqmNn0&usqp=CAU`} alt={`Logo`} />
              
              </div>
    
        </div>
      </section>
  
    <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left side */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac
          sodales sapien, sed hendrerit sapien. Curabitur bibendum dui vel
          sapien bibendum, nec volutpat mauris fringilla.
        </p>

        <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
          magna non purus euismod aliquet. Suspendisse potenti. Nullam vel
          libero sit amet dolor blandit tincidunt.
        </p>
      </div>

      {/* Right side */}
      <div className="bg-green-50 p-6 rounded-lg shadow-sm">
        <h3 className=" text-green-500 text-lg font-bold mb-3">Microsoft Preview</h3>
        <p className="text-gray-600 mb-4">
          Neque egestas congue quisque egestas diam in arcu cursus euismod quis
          viverra nibh cras pulvinar mattis nunc sed blandit.
        </p>
        <img
          src="https://scontent.fcgp27-1.fna.fbcdn.net/v/t39.30808-6/509602516_2846175352437067_5086961343333721265_n.jpg?_nc_cat=100&cb=99be929b-fc739e1c&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=StnzbdgMA6MQ7kNvwHIutfj&_nc_oc=AdnA4Q3UHllWEvvM_5qrY4lmR3tifhb_SLwUhqyjNumm4_3SMkuC8AxULBbqhV-pTf4&_nc_zt=23&_nc_ht=scontent.fcgp27-1.fna&_nc_gid=zJWNcNQjJvJSiUtqQjo3yg&oh=00_AfUQcVFd2kAwPMJPEc8QZyWFENsi1OjJJEAcc0YPGLC2nA&oe=68A375F5"
          alt="Meeting"
          className="rounded-lg w-full h-48 object-cover"
        />
      </div>
    </section>
      {/* Courses */}
      
      <Courses/>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-gray-50">
        <h2 className="text-center text-2xl font-bold mb-2">Testimonials</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Hear from our learners as they share their journeys of transformation,
          success, and how our platform has made a difference in their lives.
        </p>
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {[1, 2, 3].map((t) => (
            <div
              key={t}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300" />
                <div>
                  <h4 className="font-semibold">Name</h4>
                  <p className="text-xs text-gray-500">Role @ Company</p>
                </div>
              </div>
              <div className="flex items-center mt-3 text-red-500">⭐⭐⭐⭐⭐</div>
              <p className="text-sm text-gray-600 mt-3">
                I’ve been using Imagify for nearly two years, primarily for
                Instagram, and it has been incredibly user-friendly, making my
                work much easier.
              </p>
              <a href="#" className="text-blue-600 text-sm mt-3 inline-block">
                Read more
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-3">
          Learn anything, anytime, anywhere
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim
          id veniam aliqua proident excepteur commodo do ea.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700">
            Get started
          </button>
          <button className="text-blue-600 font-medium hover:underline">
            Learn more →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 p-12 px-4">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                E
              </div>
              <span className="font-bold text-lg text-white">Edemy</span>
            </div>
            <p className="text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About us</a></li>
              <li><a href="#" className="hover:underline">Contact us</a></li>
              <li><a href="#" className="hover:underline">Privacy policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">
              Subscribe to our newsletter
            </h4>
            <p className="text-sm mb-3">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-l-md outline-none text-black"
              />
              <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-8">
          Copyright 2024 © Edemy. All Rights Reserved.
        </div>
      </footer>
      

    </div>
  );
}