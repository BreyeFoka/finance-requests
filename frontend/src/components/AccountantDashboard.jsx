
// import React, { useState, useEffect } from 'react';
// import { api } from '../api/api';

// const AccountantDashboard = () => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     // Fetch requests from workers
//     const fetchRequests = async () => {
//       try {
//         const response = await api.get('/api/requests');
//         setRequests(response.data);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       const response = await api.put(`/api/requests/${id}`);
//       if (response.data.success) {
//         setRequests((prevRequests) =>
//           prevRequests.map((request) =>
//             request.id === id ? { ...request, status: 'Approved' } : request
//           )
//         );
//       }
//     } catch (error) {
//       console.error('Error approving request:', error);
//     }
//   };

//   const handleDeny = async (id) => {
//     try {
//       const response = await api.post(`/api/requests/${id}`);
//       if (response.data.success) {
//         setRequests((prevRequests) =>
//           prevRequests.map((request) =>
//             request.id === id ? { ...request, status: 'Denied' } : request
//           )
//         );
//       }
//     } catch (error) {
//       console.error('Error denying request:', error);
//     }
//   };

//   const handleExport = async () => {
//     try {
//       const response = await api.get('/api/export/export-requests', {
//         responseType: 'blob'
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'requests.xlsx');
//       document.body.appendChild(link);
//       link.click();
//     } catch (error) {
//       console.error('Error exporting requests:', error);
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Accountant Dashboard</h1>
//       <div className="mb-8">
//         <h2 className="text-xl font-bold mb-2">Requests</h2>
//         <ul className="space-y-2">
//           {requests.map((request) => (
//             <li key={request.id} className="p-4 bg-gray-100 rounded shadow">
//               <div><strong>Name:</strong> {request.names}</div>
//               <div><strong>Amount:</strong> {request.amount}</div>
//               <div><strong>Reason:</strong> {request.reason}</div>
//               <div><strong>Date:</strong> {request.date}</div>
//               <div><strong>Status:</strong> {request.status}</div>
//               {request.status === 'pending' && (
//                 <div className="mt-2 space-x-2">
//                   <button onClick={() => handleApprove(request.id)} className="btn btn-success">Approve</button>
//                   <button onClick={() => handleDeny(request.id)} className="btn btn-danger">Deny</button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <button onClick={handleExport} className="btn btn-primary">Export Requests</button>
//     </div>
//   );
// };

// export default AccountantDashboard;
import React, { useState, useEffect } from 'react';
import { api } from '../api/api';

const AccountantDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('/api/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError('Failed to load requests.');
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await api.put(`/api/requests/${id}`, { status: 'Approved' });
      if (response.data.success) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status: 'Approved' } : request
          )
        );
      }
    } catch (error) {
      console.error('Error approving request:', error);
      setError('Failed to approve request.');
    }
  };

  const handleDeny = async (id) => {
    try {
      const response = await api.put(`/api/requests/${id}`, { status: 'Denied' });
      if (response.data.success) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status: 'Denied' } : request
          )
        );
      }
    } catch (error) {
      console.error('Error denying request:', error);
      setError('Failed to deny request.');
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/api/export/export-requests', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'requests.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting requests:', error);
      setError('Failed to export requests.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Accountant Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Requests</h2>
        <ul className="space-y-2">
          {requests.map((request) => (
            <li key={request.id} className="p-4 bg-gray-100 rounded shadow">
              <div><strong>Name:</strong> {request.names}</div>
              <div><strong>Amount:</strong> {request.amount}</div>
              <div><strong>Reason:</strong> {request.reason}</div>
              <div><strong>Date:</strong> {request.date}</div>
              <div><strong>Status:</strong> {request.status}</div>
              {request.status === 'pending' && (
                <div className="mt-2 space-x-2">
                  <button onClick={() => handleApprove(request.id)} className="btn btn-success">Approve</button>
                  <button onClick={() => handleDeny(request.id)} className="btn btn-danger">Deny</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleExport} className="btn btn-primary">Export Requests</button>
    </div>
  );
};

export default AccountantDashboard;
