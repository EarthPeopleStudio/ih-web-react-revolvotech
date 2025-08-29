import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { FaLock, FaUser, FaShieldAlt } from "react-icons/fa";
import { HiSupport } from "react-icons/hi";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  .icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: white;
    margin: 0 auto 1.5rem;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }

  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
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
    color: #94a3b8;
    font-size: 1.1rem;
    z-index: 1;
  }

  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f9fafb;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &::placeholder {
      color: #94a3b8;
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
    color: #64748b;
    font-size: 0.9rem;
    cursor: pointer;

    input {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }

  a {
    color: #667eea;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #764ba2;
    }
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
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
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
  margin-top: 1rem;

  .icon {
    color: #667eea;
    font-size: 1.2rem;
  }

  p {
    color: #64748b;
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

const ErrorMessage = styled(motion.div)`
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px;
  color: #dc2626;
  font-size: 0.9rem;
  text-align: center;
`;

const SupportLogin = () => {
  const navigate = useNavigate();
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

    // Mock authentication
    setTimeout(() => {
      if (formData.email === "support@choreo.app" && formData.password === "demo123") {
        // Store mock session
        localStorage.setItem("supportAgent", JSON.stringify({
          name: "Sarah Johnson",
          email: formData.email,
          role: "Support Agent",
          avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=667eea&color=fff"
        }));
        navigate("/support/dashboard");
      } else {
        setError("Invalid credentials. Use support@choreo.app / demo123");
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
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LogoSection>
          <motion.div 
            className="icon"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <HiSupport />
          </motion.div>
          <h1>Support Portal</h1>
          <p>Sign in to access the support dashboard</p>
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
              type="email"
              name="email"
              placeholder="Email address"
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
            {isLoading ? "Signing in..." : "Sign In"}
          </SubmitButton>
        </Form>

        <SecurityNote>
          <FaShieldAlt className="icon" />
          <p>
            This is a secure portal for Choreo support staff only. 
            All activities are monitored and logged for security purposes.
          </p>
        </SecurityNote>
      </LoginCard>
    </LoginContainer>
    </>
  );
};

export default SupportLogin;