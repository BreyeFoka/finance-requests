// import React, { useState, useEffect } from 'react';
// import { api } from '../api/api';

// // TODO: Add a function to dynamically assign this as a component based on the sign in Prroval to fetch only request adressed to that approval
// const AccountantDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [error, setError] = useState(null);
//   const [comments, setComments] = useState({});

//   const fetchRequests = async () => {
//     try {
//       const response = await api.get('/api/requests');
//       console.log(response.data);
//       setRequests(response.data);
//     } catch (error) {
//       console.error('Error fetching requests:', error);
//       setError('Failed to load requests.');
//     }
//   };



//   useEffect(() => {
//     fetchRequests();
//   }, []); 

//   const formatDate = (date) => {
//     const newDate = new Date(date);
//     const simpleDate = newDate.toISOString().split('T')[0];
//     return simpleDate;
//   };


//   const handleApprove = async (id) => {
//     try {
//       const response = await api.put(`/api/requests/${id}`, { 
//         status: 'approved', 
//         approvalcomment: comments[id] || '' 
//       });
//       if (response.data.success) {
//         console.log(response.data);
//         fetchRequests();
//       }
//     } catch (error) {
//       console.error('Error approving request:', error);
//       alert('Failed to approve request.');
//       setError('Failed to approve request.');
//     }
//   };
  
//   const handleDeny = async (id) => {
//     try {
//       const response = await api.put(`/api/requests/${id}`, { 
//         status: 'denied', 
//         approvalcomment: comments[id] || '' 
//       });
//       if (response.data.success) {
//         console.log(response.data);
//         fetchRequests();
//       }
//     } catch (error) {
//       console.error('Error denying request:', error);
//       alert('Failed to deny request.');
//       setError('Failed to deny request.');
//     }
//   };

//   const handleCommentChange = (id, value) => {
//     setComments((prevComments) => ({
//       ...prevComments,
//       [id]: value,
//     }));
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
//       setError('Failed to export requests.');
//     }
//   };
//   const getFullFilePath = (filepath) => {

//     const baseURL = 'http://localhost:5000';
//     return `${baseURL}/${filepath}`;
//   };
    


//   return (
//     <div className="p-auto">
//     <h1 className="text-2xl font-bold mb-4">Approval 1 Dashboard</h1>
//     {error && <div className="text-red-500 mb-4">{error}</div>}
//     <div className="mb-8">
//       <h2 className="text-xl font-bold mb-2">Pending Requests</h2>
//       <h2 className="text-xl font-bold text-blue-500">Total Requests: {requests.length}</h2>
//       <h3 className="text-xl font-normal text-black">No. of Requests Pending: {requests.filter(request => request.status === 'pending').length}</h3>
//       <h3 className="text-xl font-normal text-black">No. of Requests Approved: {requests.filter(request => request.status === 'approved').length}</h3>
//       <ul className="space-y-2">
//         {requests.filter(request => request.status === 'pending').map((request) => (
//           <li key={request.id} className="p-4 justify-between bg-gray-100 rounded shadow  md:flex md:flex-row md:space-x-10 md:my-3 md:mx-3">
//             <div><strong>Name:</strong> <br /> {request.names}</div>
//             <div><strong>Amount:</strong> <br /> {request.amount}</div>
//             <div><strong>Reason:</strong><br /> {request.reason}</div>
//             <div><strong>Date:</strong> <br />{formatDate(request.date)}</div>
//             <div><strong>Status:</strong> <br />{request.status}</div>
//             <div className='w-32'><strong>Comments:</strong><br /> {request.comments}</div>
//             <div><strong>File Attached:</strong><br /> {request.filepath ? 'Yes' : 'No'}</div>
//             {request.filepath && (
//               <a href={getFullFilePath(request.filepath)} target='_blank' rel="noopener noreferrer" className="text-blue-500 hover:text-blue-800 w-32  h-16 shadow-md border-blue-400 bg-white rounded-xl text-center border">View <br />Attachement</a>
//             )}
//             <div className="mt-2 flex flex-col space-y-2">
//               <div className="flex flex-row space-x-4">
//                 <button onClick={() => handleApprove(request.id)} className="btn rounded text-white bg-green-500 px-3 py-1">Approve</button>
//                 <button onClick={() => handleDeny(request.id)} className="btn rounded text-white bg-red-500 px-3 py-1">Deny</button>
//               </div>
//               <label htmlFor={`comment-${request.id}`} className="block text-lg font-medium text-gray-700">Comment</label>
//               <textarea
//                 id={`comment-${request.id}`}
//                 name="comments"
//                 value={comments[request.id] || ''}
//                 onChange={(e) => handleCommentChange(request.id, e.target.value)}
//                 className="shadow-sm mt-1 block p-2 w-full"
//                 rows="2"
//                 placeholder="comment"
//               ></textarea>
//             </div>
//           </li>
//         ))}
//       </ul>
  
//       <div>
//         <h1>Approved requests:
//           {requests.filter(request => request.status === 'approved').map((request) => (
//             <p key={request.id}>{request.names} | {request.amount} | {request.reason}</p>
//           ))}
//         </h1>
//       </div>
//     </div>
//     <button onClick={handleExport} className="btn text-xl font-medium bg-blue-600 px-2 rounded-xl py-1 text-white shadow-blue-950 shadow-xl">Export Requests</button>
//   </div>
  
//   );
// };

// export default AccountantDashboard;


import React, { useState, useEffect } from 'react';
import { api } from '../api/api';

const AccountantDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});

  const fetchRequests = async () => {
    try {
      const response = await api.get('/api/requests');
      console.log(response.data);
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Failed to load requests.');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const simpleDate = newDate.toISOString().split('T')[0];
    return simpleDate;
  };

  const handleApprove = async (id) => {
    try {
      const response = await api.put(`/api/requests/${id}`, { 
        status: 'approved', 
        approvalcomment: comments[id] || '' 
      });
      if (response.data.success) {
        console.log(response.data);
        fetchRequests();
      }
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve request.');
      setError('Failed to approve request.');
    }
  };

  const handleDeny = async (id) => {
    try {
      const response = await api.put(`/api/requests/${id}`, { 
        status: 'denied', 
        approvalcomment: comments[id] || '' 
      });
      if (response.data.success) {
        console.log(response.data);
        fetchRequests();
      }
    } catch (error) {
      console.error('Error denying request:', error);
      alert('Failed to deny request.');
      setError('Failed to deny request.');
    }
  };

  const handleCommentChange = (id, value) => {
    setComments((prevComments) => ({
      ...prevComments,
      [id]: value,
    }));
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

  const getFullFilePath = (filepath) => {
    const baseURL = 'http://localhost:5000';
    return `${baseURL}/${filepath}`;
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <h1 className="text-2xl font-bold mb-4">Approval 1 Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Pending Requests</h2>
        <h2 className="text-xl font-bold text-blue-500">Total Requests: {requests.length}</h2>
        <h3 className="text-xl font-normal text-black">No. of Requests Pending: {requests.filter(request => request.status === 'pending').length}</h3>
        <h3 className="text-xl font-normal text-black">No. of Requests Approved: {requests.filter(request => request.status === 'approved').length}</h3>
        <ul className="space-y-4">
          {requests.filter(request => request.status === 'pending').map((request) => (
            <li key={request.id} className="p-4 bg-gray-100 rounded shadow flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0 md:items-center">
              <div className="flex-1"><strong>Name:</strong> <br /> {request.names}</div>
              <div className="flex-1"><strong>Amount:</strong> <br /> {request.amount}</div>
              <div className="flex-1"><strong>Reason:</strong><br /> {request.reason}</div>
              <div className="flex-1"><strong>Date:</strong> <br />{formatDate(request.date)}</div>
              <div className="flex-1"><strong>Status:</strong> <br />{request.status}</div>
              <div className="flex-1"><strong>Comments:</strong><br /> {request.comments}</div>
              <div className="flex-1"><strong>File Attached:</strong><br /> {request.filepath ? 'Yes' : 'No'}</div>
              {request.filepath && (
                <a href={getFullFilePath(request.filepath)} target='_blank' rel="noopener noreferrer" className="text-blue-500 hover:text-blue-800 w-full md:w-auto text-center">View Attachment</a>
              )}
              <div className="mt-2">
                <label htmlFor={`comment-${request.id}`} className="block text-lg font-medium text-gray-700">Comment</label>
                <textarea
                  id={`comment-${request.id}`}
                  name="comments"
                  value={comments[request.id] || ''}
                  onChange={(e) => handleCommentChange(request.id, e.target.value)}
                  className="shadow-sm mt-1 block w-full"
                  rows="2"
                  placeholder="comment"
                ></textarea>
              </div>
              <div className="mt-2 flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
                <button onClick={() => handleApprove(request.id)} className="btn rounded text-white bg-green-500 px-3 py-1">Approve</button>
                <button onClick={() => handleDeny(request.id)} className="btn rounded text-white bg-red-500 px-3 py-1">Deny</button>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <h1>Approved requests:
            {requests.filter(request => request.status === 'approved').map((request) => (
              <p key={request.id}>{request.names} | {request.amount} | {request.reason}</p>
            ))}
          </h1>
        </div>
      </div>
      <button onClick={handleExport} className="btn text-xl font-medium bg-blue-600 px-4 py-2 rounded-xl text-white">Export Requests</button>
    </div>
  );
};

export default AccountantDashboard;
