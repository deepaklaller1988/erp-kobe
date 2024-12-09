import useTitle from "../hooks/useTitle";

const NotFound = () => {
  useTitle({ title: "Not found" });
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-[100px] font-bold text-[#2d316d]">404</h1>
      <p className="text-2xl text-gray-400">Page not found</p>
    </div>
  );
};

export default NotFound;
