import React from "react";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 my-6">
      <button onClick={handlePrev} className="bg-[#efefef] text-black px-3 py-1 rounded-lg border-[1px] border-white hover:border-black duration-300 hover:bg-blue-600">
        Previous
      </button>
      <section className="flex gap-2">
      <button className="bg-[#efefef] px-3 py-1 rounded-lg border-[1px] text-black  hover:border-black duration-300 hover:bg-blue-600">
        1
      </button>
      <button className="bg-[#efefef] px-3 py-1 rounded-lg border-[1px] text-black  hover:border-black duration-300 hover:bg-blue-600">
        2
      </button>
      <button className="bg-[#efefef] px-3 py-1 rounded-lg border-[1px] text-black  hover:border-black duration-300 hover:bg-blue-600">
        3
      </button>
      </section>
      <button onClick={handleNext} className="bg-[#efefef] text-black px-3 py-1 rounded-lg border-[1px] hover:bg-blue-600  border-white hover:border-black duration-300">
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
