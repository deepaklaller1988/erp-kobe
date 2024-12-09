import { TableColumn } from "react-data-table-component";
import { DataTable } from "../components/DataTable";
import useTitle from "../hooks/useTitle";
import { SellerProductData } from "../types/DataTableAttributes";
import { FaPlay } from "react-icons/fa6";

const SellerHome = () => {
  useTitle({ title: "Bots" });
  const data: SellerProductData[] = [
    {
      botName: "Bot A",
      messageType: "Message only",
      creatorsReached: 100,
      replies: 50,
      sampleRequests: 30,
      remainingCreators: 70,
      botStatus: "Working",
      createdDate: "12 minutes ago",
      action: "Stop",
    },
    {
      botName: "Bot B",
      messageType: "Image only",
      creatorsReached: 200,
      replies: 150,
      sampleRequests: 50,
      remainingCreators: 50,
      botStatus: "Stopped",
      createdDate: "a minute ago",
      action: "Restart",
    },
    {
      botName: "Bot C",
      messageType: "Message + Target Collab Product Card",
      creatorsReached: 300,
      replies: 50,
      sampleRequests: 100,
      remainingCreators: 20,
      botStatus: "Working",
      createdDate: "2 hours ago",
      action: "Stop",
    },
    {
      botName: "Bot D",
      messageType: "Message + Open Collab Product Card",
      creatorsReached: 300,
      replies: 50,
      sampleRequests: 100,
      remainingCreators: 20,
      botStatus: "Ready",
      createdDate: "3 hours ago",
      action: "Start",
    },
  ];

  const columns: TableColumn<SellerProductData>[] = [
    {
      name: "Bot Name",
      selector: (row) => row.botName,
      sortable: false,
      style: { width: "10px " },
      width: "8%",
    },
    {
      name: "Message Type",
      selector: (row) => row.messageType,
      sortable: false,
      width: "20%",
      cell: (row) => <div className="text-xs">{row.messageType}</div>,
    },
    {
      name: "Creators Reached",
      selector: (row) => row.creatorsReached,
      sortable: false,
      width: "12%",
    },
    {
      name: "Replies",
      selector: (row) => row.replies,
      sortable: false,
      width: "8%",
    },
    {
      name: "Sample Requests",
      selector: (row) => row.sampleRequests,
      sortable: false,
      width: "11%",
    },
    {
      name: "Remaining Creators",
      selector: (row) => row.remainingCreators,
      sortable: false,
      width: "13%",
    },
    {
      name: "Status",
      selector: (row) => row.botStatus,
      sortable: false,
      cell: (row) => (
        <div
          className={`text-black whitespace-nowrap ${
            row.botStatus.toLowerCase() === "working"
              ? "bg-blue-100 text-black"
              : "bg-red-100 text-black"
          } font-semibold text-xs w-full p-2.5 rounded-xl`}
        >
          {row.botStatus}
        </div>
      ),
    },
    {
      name: "Created Date",
      selector: (row) => row.createdDate,
      sortable: false,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: false,
      cell: (row) => (
        <div
          className={`border-[1px] hover:text-white duration-300 py-3 whitespace-nowrap ${
            row.action.toLowerCase() === "start"
              ? "border-green-300 text-green-500 hover:bg-green-500"
              : row.action.toLowerCase() === "stop"
              ? "border-red-300 text-red-500 hover:bg-red-500"
              : "border-indigo-300 text-indigo-500 hover:bg-indigo-500"
          } w-full py-1.5 font-semibold cursor-pointer text-center rounded-xl flex gap-2 items-center justify-center`}
        >
          <FaPlay />
          {row.action}
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="mt-3 max-w-full">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default SellerHome;
