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
      <button className="bg-[#efefef] text-black/50 px-3 py-1 rounded-lg border-[1px] text-black border-white hover:border-[#018c5e] duration-300">
        Previous
      </button>
      <section className="flex gap-2">
      <button className="bg-[#018c5e] text-white px-3 py-1 rounded-lg">
        1
      </button>
      <button className="bg-[#efefef] text-black/50 px-3 py-1 rounded-lg border-[1px] text-black border-white hover:border-[#018c5e] duration-300">
        2
      </button>
      <button className="bg-[#efefef] text-black/50 px-3 py-1 rounded-lg border-[1px] text-black border-white hover:border-[#018c5e] duration-300">
        3
      </button>
      <button className="bg-[#efefef] text-black/50 px-3 py-1 rounded-lg border-[1px] text-black border-white hover:border-[#018c5e] duration-300">
        4
      </button>
      </section>
      <button className="bg-[#efefef] text-black/50 px-3 py-1 rounded-lg border-[1px] text-black border-white hover:border-[#018c5e] duration-300">
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
