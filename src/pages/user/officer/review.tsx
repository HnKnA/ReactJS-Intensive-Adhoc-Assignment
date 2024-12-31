import React from "react";
import { Link } from "react-router-dom"; 
import { toast } from "react-toastify";
import {
  useGetUserListQuery,
  useReviewKycSubmissionMutation,
  Status,
} from "../../../services/apis/user";

const UserReview = () => {
  const { data: users = [] } = useGetUserListQuery();
  const [reviewKycSubmission] = useReviewKycSubmissionMutation();

  const handleAction = async (action: "Approve" | "Reject") => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${action.toLowerCase()} this user?`
    );
    if (!confirmAction) return;

    try {
      await reviewKycSubmission().unwrap(); // No body is sent here
      toast.success(`Successfully ${action.toLowerCase()} action!`);
    } catch (error) {
      toast.error(`Failed to ${action.toLowerCase()} user.`);
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.Active:
        return "text-green-700 bg-green-100";
      case Status.Pending:
        return "text-yellow-700 bg-yellow-100";
      case Status.Inactive:
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        KYC Submission
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  <Link
                    to={`/pages/user/tuan/pi`} // Define the link to the user profile
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium leading-tight rounded-full ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">{user.date}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="text-green-600 dark:text-green-500 hover:underline mr-2"
                    onClick={() => handleAction("Approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => handleAction("Reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserReview;
