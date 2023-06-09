import Wrapper from "@/components/common/wrapper";
import Hero from "@/components/home/hero";
import Subcontent from "@/components/home/subcontent";
import Footer from "@/components/home/footer";
import Navbar from "@/components/common/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Wrapper>
        <Hero />
        <Subcontent />
      </Wrapper>
      <Footer />
    </>
  );
}
