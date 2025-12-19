// This is file with demos of your component
// Each export is one usecase for your component

import ShaderBackground from "@/components/ui/shader-background";

const DemoOne = () => {
  return (
    <div className="relative min-h-screen">
      <ShaderBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl font-bold mb-4">Shader Background Demo</h1>
          <p className="text-lg opacity-90">
            This is a demo of the ShaderBackground component
          </p>
        </div>
      </div>
    </div>
  );
};

export { DemoOne };
