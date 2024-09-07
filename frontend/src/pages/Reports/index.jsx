import React, { useState } from "react";
import Header from "../../components/Header/index";
import Sidebar from "../../components/Sidebar/index";
import { FaSearch, FaFilter, FaEdit, FaTrash } from "react-icons/fa";

const Reports = () => {
  // Sample data
  const [reports, setReports] = useState([
    { id: 1, date: "2024-08-01", name: "Sales Report", status: "Completed" },
    { id: 2, date: "2024-08-05", name: "Expense Report", status: "Pending" },
    {
      id: 3,
      date: "2024-08-10",
      name: "User Activity Report",
      status: "Completed",
    },
    // Add more sample reports
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [newReportDetails, setNewReportDetails] = useState({
    date: "",
    name: "",
    status: "Completed",
  });

  // Filter and search reports
  const filteredReports = reports
    .filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.date.includes(searchTerm);
      const matchesStatus =
        filterStatus === "All" || report.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

  const handleOpenEditModal = (report) => {
    setSelectedReport(report);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedReport(null);
  };

  const handleUpdateReport = () => {
    if (selectedReport) {
      setReports(
        reports.map((report) =>
          report.id === selectedReport.id ? selectedReport : report
        )
      );
      handleCloseEditModal();
    }
  };

  const handleDeleteReport = (reportToDelete) => {
    setReports(reports.filter((report) => report !== reportToDelete));
  };

  return (
    <div className="reports flex">
      <Sidebar />
      <div className="main-content flex-1">
        <Header />
        <main className="content p-6 bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Reports</h2>

          {/* Search and Filter */}
          <div className="search-filter-section flex items-center justify-between mb-6">
            <div className="search-bar flex items-center border border-gray-300 rounded-lg p-2 bg-white w-1/3">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none w-full"
              />
            </div>

            <div className="filter-section flex items-center ml-4">
              <FaFilter className="text-gray-500 mr-2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 bg-white"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Reports Table */}
          <div className="reports-table bg-white shadow-md rounded-lg p-6 mb-6">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th
                    className="py-2 px-4 text-left cursor-pointer"
                    onClick={() => setSortBy("date")}
                  >
                    Date
                  </th>
                  <th
                    className="py-2 px-4 text-left cursor-pointer"
                    onClick={() => setSortBy("name")}
                  >
                    Report Name
                  </th>
                  <th
                    className="py-2 px-4 text-left cursor-pointer"
                    onClick={() => setSortBy("status")}
                  >
                    Status
                  </th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{report.date}</td>
                    <td className="py-2 px-4">{report.name}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          report.status === "Completed"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 flex items-center">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleOpenEditModal(report)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteReport(report)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Report Modal */}
          {showEditModal && selectedReport && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h3 className="text-2xl font-semibold mb-4">Edit Report</h3>
                <div className="mb-4">
                  <label className="block text-gray-700">Date</label>
                  <input
                    type="date"
                    value={selectedReport.date}
                    onChange={(e) =>
                      setSelectedReport({
                        ...selectedReport,
                        date: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Report Name</label>
                  <input
                    type="text"
                    value={selectedReport.name}
                    onChange={(e) =>
                      setSelectedReport({
                        ...selectedReport,
                        name: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Status</label>
                  <select
                    value={selectedReport.status}
                    onChange={(e) =>
                      setSelectedReport({
                        ...selectedReport,
                        status: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                    onClick={handleUpdateReport}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleCloseEditModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Reports;
