import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { FaLock, FaUser, FaShieldAlt, FaCode } from "react-icons/fa";
import { HiFingerPrint } from "react-icons/hi";
import { AdminContext } from "../AdminApp";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-20px) translateX(10px); }
  66% { transform: translateY(10px) translateX(-10px); }
`;

const glow = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  position: relative;
  overflow: hidden;

  /* Tech grid background */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(255, 107, 53, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 107, 53, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: ${float} 20s ease-in-out infinite;
  }

  /* Floating orbs */
  &::after {
    content: "";
    position: absolute;
    top: 20%;
    left: 10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(100px);
    animation: ${float} 15s ease-in-out infinite reverse;
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  color: rgba(255, 107, 53, 0.2);
  font-size: ${props => props.size || '2rem'};
  top: ${props => props.top};
  left: ${props => props.left};
  animation: ${float} ${props => props.duration || '20s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const LoginCard = styled(motion.div)`
  background: rgba(13, 13, 13, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.8),
    0 0 100px rgba(255, 107, 53, 0.1),
    inset 0 0 30px rgba(255, 107, 53, 0.05);
  position: relative;
  z-index: 10;

  /* Glowing corners */
  &::before, &::after {
    content: "";
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid transparent;
  }

  &::before {
    top: -2px;
    left: -2px;
    border-top-color: rgba(255, 107, 53, 0.5);
    border-left-color: rgba(255, 107, 53, 0.5);
    border-radius: 24px 0 0 0;
  }

  &::after {
    bottom: -2px;
    right: -2px;
    border-bottom-color: rgba(255, 107, 53, 0.5);
    border-right-color: rgba(255, 107, 53, 0.5);
    border-radius: 0 0 24px 0;
  }
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  .logo {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: white;
    margin: 0 auto 1.5rem;
    box-shadow: 
      0 10px 30px rgba(255, 107, 53, 0.4),
      0 0 60px rgba(255, 107, 53, 0.2);
    position: relative;

    &::after {
      content: "";
      position: absolute;
      inset: -20px;
      background: radial-gradient(circle, rgba(255, 107, 53, 0.2) 0%, transparent 70%);
      border-radius: 50%;
      animation: ${glow} 2s ease-in-out infinite;
      z-index: -1;
    }
  }

  h1 {
    font-family: "Inter", sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  p {
    color: #888888;
    font-size: 0.95rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;

  .icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666666;
    font-size: 1.1rem;
    z-index: 1;
  }

  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.02);
    color: #ffffff;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: rgba(255, 107, 53, 0.5);
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 
        0 0 0 3px rgba(255, 107, 53, 0.1),
        0 0 20px rgba(255, 107, 53, 0.1);
    }

    &::placeholder {
      color: #666666;
    }
  }
`;

const RememberSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #888888;
    font-size: 0.9rem;
    cursor: pointer;

    input {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #ff6b35;
    }
  }

  a {
    color: #ff6b35;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #ff8c42;
      text-decoration: underline;
    }
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 30px rgba(255, 107, 53, 0.3),
    0 0 30px rgba(255, 107, 53, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 15px 40px rgba(255, 107, 53, 0.4),
      0 0 40px rgba(255, 107, 53, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 107, 53, 0.05);
  border: 1px solid rgba(255, 107, 53, 0.1);
  border-radius: 10px;
  margin-top: 1.5rem;

  .icon {
    color: #ff6b35;
    font-size: 1.2rem;
  }

  p {
    color: #888888;
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

const ErrorMessage = styled(motion.div)`
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px;
  color: #ef4444;
  font-size: 0.9rem;
  text-align: center;
`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AdminContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Authentication with secure password
    setTimeout(() => {
      if (formData.password === "kN;h<dO74eOgB.6X") {
        localStorage.setItem("adminAuth", "true");
        localStorage.setItem("adminUser", JSON.stringify({
          name: "Admin User",
          email: formData.email || "admin",
          role: "Administrator"
        }));
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError("Invalid credentials. Contact admin for access.");
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        {/* Floating tech elements */}
        <FloatingElement top="10%" left="5%" size="3rem" duration="25s">
          <FaCode />
        </FloatingElement>
        <FloatingElement top="70%" left="85%" size="2.5rem" duration="30s" delay="5s">
          <FaShieldAlt />
        </FloatingElement>
        <FloatingElement top="40%" left="90%" size="2rem" duration="20s" delay="10s">
          <HiFingerPrint />
        </FloatingElement>

        <LoginCard
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LogoSection>
            <motion.div 
              className="logo"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaCode />
            </motion.div>
            <h1>Revolvo Admin</h1>
            <p>Access your business dashboard</p>
          </LogoSection>

          <Form onSubmit={handleSubmit}>
            {error && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </ErrorMessage>
            )}

            <InputGroup>
              <FaUser className="icon" />
              <input
                type="text"
                name="email"
                placeholder="Username (any)"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <RememberSection>
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </RememberSection>

            <SubmitButton
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? "Authenticating..." : "Access Dashboard"}
            </SubmitButton>
          </Form>

          <SecurityNote>
            <FaShieldAlt className="icon" />
            <p>
              Protected admin portal. All access attempts are logged and monitored. 
              Unauthorized access is prohibited.
            </p>
          </SecurityNote>
        </LoginCard>
      </LoginContainer>
    </>
  );
};

export default AdminLogin;