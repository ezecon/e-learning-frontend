
export default function HeroSection() {
  return (
    <div className="font-sans text-gray-800">
     
      {/* Hero */}
      <section className="montserrat-alternates bg-gradient-to-b from-blue-50 to-white text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
          Empower your future with the courses designed to{" "}
          <span className="text-green-600  decoration-green-300">
            fit your choice.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          We bring together world-class instructors, interactive content, and a
          supportive community to help you achieve your personal and
          professional goals.
        </p>
       
      </section>
    </div>
  );  
}
