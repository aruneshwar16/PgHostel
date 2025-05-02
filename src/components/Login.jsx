// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import config from '../config';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//     setError('');
//     setSuccess('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setIsLoading(true);

//     try {
//       console.log('Sending POST request to:', `${config.apiUrl}/api/auth/login`);
//       console.log('Payload:', formData);

//       const response = await axios.post(`${config.apiUrl}/api/auth/login`, {
//         email: formData.email,
//         password: formData.password
//       });

//       console.log('Login response:', response);

//       if (response.status === 200 && response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//         setSuccess('Login successful! Redirecting...');
//         setTimeout(() => navigate('/'), 1000); // wait 1s to show success msg
//       } else {
//         setError('Unexpected login response format.');
//       }
//     } catch (err) {
//       console.log('Full error object:', err);

//       // Check if the error is coming from the backend response
//       if (err.response) {
//         console.log('Backend responded with error:', err.response.data);
//         setError(err.response.data.message || err.response.data.error || 'Login failed.');
//       } else if (err.request) {
//         console.log('No response received:', err.request);
//         setError('No response from server. Please check your network or backend.');
//       } else {
//         console.log('Error in setting up request:', err.message);
//         setError('Something went wrong. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         {success && <div className="success-message">{success}</div>}
//         {error && <div className="error-message">{error}</div>}
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             disabled={isLoading}
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             disabled={isLoading}
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
