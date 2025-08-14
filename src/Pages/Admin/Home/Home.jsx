import { CarouselCustomNavigation } from "../../../Components/PhotoCard/Carousel";

export function HomeAdmin() {
  

  return (
    <div>
      <h1 className="montserrat-alternates text-center text-green-500 py-5 font-bold text-xl">
         Welcome to the Admin Dashboard
      </h1>
      <div className="m-10">
         <CarouselCustomNavigation />

      </div>
    </div>
  );
}
