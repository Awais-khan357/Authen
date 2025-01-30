import React, { useState, useEffect } from "react";
import axios from "./config/axios";

const ViewRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/courses/registrations");
      setRegistrations(response.data.registrations);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Course Registrations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {registrations.map((reg) => (
                <tr key={reg._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{reg.stdName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{reg.rollno}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reg.semester}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {reg.courses.map((course) => (
                        <span
                          key={course}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(reg.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewRegistration;
