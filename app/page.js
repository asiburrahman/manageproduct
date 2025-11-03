
import Hero from "./components/Hero";
import ProductStats from "./components/ProductStats";
import Testimonials from "./components/Testimonials";
import Service from "./service/component/Service";



export default function Home() {
  return (
  <div>
    
    <Hero></Hero>
    <Service></Service>
    <ProductStats></ProductStats>
    <Testimonials></Testimonials>

  </div>
  );
}
