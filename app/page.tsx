import Wrapper from "@/components/common/wrapper";
import Hero from "@/components/home/hero";
import Subcontent from "@/components/home/subcontent";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <>
      <Wrapper>
        <Hero />
        <Subcontent />
      </Wrapper>
      <Footer />
    </>
  );
}
