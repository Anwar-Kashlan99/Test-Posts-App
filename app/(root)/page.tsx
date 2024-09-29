import AuthButtons from "@/components/AuthButtons";
import ParticlesEffect from "@/components/ParticlesEffect";

const Home = () => {
  return (
    <main className="hero-background h-screen relative">
      <ParticlesEffect />
      <div className="flex justify-center items-center flex-col z-40 gap-4">
        <h1 className=" mb-4 text-white text-4xl">Welcome to the Post App</h1>
        <AuthButtons />
      </div>
    </main>
  );
};

export default Home;
