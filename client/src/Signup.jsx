import { useState } from 'react';
import "./Style.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate();

    // Password validation function
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate password
        if (!validatePassword(password)) {
            setErrorMessage('Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.');
            return;
        }
        setErrorMessage(''); 

        // Check if passwords match
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            return;
        }
        setConfirmPasswordError(''); 

        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result);
                toast.success('Registration successful!');
                setTimeout(() => navigate('/login'), 2000);
            })
            .catch(err => {
                console.log(err);
                toast.error('Registration failed! Please try again.');
            });
    };

    return (
        <div className="d-flex">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                }}
            />
            <div className="bg-white">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword">
                            <strong>Confirm Password</strong>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            name="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}
                    </div>
                    <button type="submit" className="btn btn-success">
                        Register
                    </button>
                </form>
                <p>Already Have an Account</p>
                <Link to="/login" className="btn btn-default text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
