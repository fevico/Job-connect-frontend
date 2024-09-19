
export default function Dashboard() {
  return (
    <div className="bg-[#E2F0FF] min-h-screen flex flex-col justify-center items-center">
      {/* Welcome Message with animation */}
      <h1 className="text-6xl font-bold text-[#0A2540] mb-5 animate-bounce">
        Welcome to Your Dashboard
      </h1>
      
      {/* Subtext with fade-in effect */}
      <p className="text-lg text-[#0A2540] max-w-md text-center opacity-0 animate-fadeIn delay-500">
        Manage your activities effortlessly and stay on top of your tasks with an intuitive and sleek design.
      </p>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A2540] to-transparent h-1/3 opacity-20"></div>
    </div>
  );
}
