import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export function Login() {
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [homeBtnHovered, setHomeBtnHovered] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost/paraiso-api/signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpData),
      });
      const result = await response.json();
      if (result.success) {
        setMessageType('success');
        setMessage('Account created successfully! You can now sign in.');
        setSignUpData({ name: '', email: '', password: '' });
        setTimeout(() => setIsRightPanelActive(false), 1500);
      } else {
        setMessageType('error');
        setMessage(result.message || 'Sign up failed. Try again.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Cannot connect to server. Make sure XAMPP is running.');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost/paraiso-api/signin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInData),
      });
      const result = await response.json();
      if (result.success) {
        setMessageType('success');
        setMessage('Login successful! Redirecting...');
        localStorage.setItem('paraiso_user', result.name);
        localStorage.setItem('paraiso_user_id', result.user_id);
        setTimeout(() => {
          // ✅ Redirect back to where user came from, or home if none
          const params = new URLSearchParams(window.location.search);
          const from = params.get('from') || '/';
          navigate(from);
        }, 1500);
      } else {
        setMessageType('error');
        setMessage(result.message || 'Invalid email or password.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Cannot connect to server. Make sure XAMPP is running.');
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.floralTopLeft}>🌸</div>
      <div style={styles.floralTopRight}>🌺</div>
      <div style={styles.floralBottomLeft}>🌹</div>
      <div style={styles.floralBottomRight}>🌸</div>
      <div style={styles.floralMiddleLeft}>🌷</div>
      <div style={styles.floralMiddleRight}>🌷</div>

      <Link
        to="/"
        style={{ ...styles.homeBtn, background: homeBtnHovered ? 'linear-gradient(to right, #FDE047, #F59E0B)' : 'linear-gradient(to right, #EAB308, #D97706)' }}
        onMouseEnter={() => setHomeBtnHovered(true)}
        onMouseLeave={() => setHomeBtnHovered(false)}
      >
        <i className="fas fa-home"></i> Home
      </Link>

      {message && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999,
          backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
          color: messageType === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', whiteSpace: 'nowrap',
        }}>
          {message}
        </div>
      )}

      <div style={{ ...styles.container, ...(isRightPanelActive ? styles.containerActive : {}) }}>

        {/* Sign Up Form */}
        <div style={{ ...styles.formContainer, ...styles.signUpContainer, ...(isRightPanelActive ? styles.signUpContainerActive : {}) }}>
          <form style={styles.form} onSubmit={handleSignUp}>
            <h1 style={styles.h1}>Create Account</h1>
            <div style={styles.socialContainer}>
              <a href="https://www.facebook.com/profile.php?id=61588248330824" style={styles.social}><i className="fab fa-facebook-f"></i></a>
              <a href="https://youtube.com" style={styles.socialText}>YT</a>
              <a href="https://instagram.com" style={styles.socialText}>IG</a>
            </div>
            <span style={styles.span}>or use your email for registration</span>
            <input style={styles.input} type="text" placeholder="Name" value={signUpData.name} onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })} required />
            <input style={styles.input} type="email" placeholder="Email" value={signUpData.email} onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} required />
            <input style={styles.input} type="password" placeholder="Password" value={signUpData.password} onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} required />
            <button style={styles.button} type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div style={{ ...styles.formContainer, ...styles.signInContainer, ...(isRightPanelActive ? styles.signInContainerActive : {}) }}>
          <form style={styles.form} onSubmit={handleSignIn}>
            <h1 style={styles.h1}>Sign In</h1>
            <div style={styles.socialContainer}>
              <a href="https://www.facebook.com/profile.php?id=61588248330824" style={styles.social}><i className="fab fa-facebook-f"></i></a>
              <a href="https://youtube.com" style={styles.socialText}>YT</a>
              <a href="https://www.instagram.com/" style={styles.socialText}>IG</a>
            </div>
            <span style={styles.span}>or use your account</span>
            <input style={styles.input} type="email" placeholder="Email" value={signInData.email} onChange={(e) => setSignInData({ ...signInData, email: e.target.value })} required />
            <input style={styles.input} type="password" placeholder="Password" value={signInData.password} onChange={(e) => setSignInData({ ...signInData, password: e.target.value })} required />
            <a href="#" style={styles.link}>Forgot your password?</a>
            <button style={styles.button} type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div style={{ ...styles.overlayContainer, ...(isRightPanelActive ? styles.overlayContainerActive : {}) }}>
          <div style={{ ...styles.overlay, ...(isRightPanelActive ? styles.overlayActive : {}) }}>
            <div style={{ ...styles.overlayPanel, ...styles.overlayLeft, ...(isRightPanelActive ? styles.overlayLeftActive : {}) }}>
              <h1 style={styles.h1}>Welcome Back!</h1>
              <p style={styles.p}>To keep connected with us please login with your personal info</p>
              <button style={styles.ghostButton} onClick={() => { setIsRightPanelActive(false); setMessage(''); }}>Sign In</button>
            </div>
            <div style={{ ...styles.overlayPanel, ...styles.overlayRight, ...(isRightPanelActive ? styles.overlayRightActive : {}) }}>
              <h1 style={styles.h1}>Hello, Friend!</h1>
              <p style={styles.p}>Enter your personal details and start your journey with us</p>
              <button style={styles.ghostButton} onClick={() => { setIsRightPanelActive(true); setMessage(''); }}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  body: { background: 'linear-gradient(135deg, #1a0a00 0%, #2d1500 40%, #1a0800 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontFamily: "'Montserrat', sans-serif", minHeight: '100vh', position: 'relative', overflow: 'hidden' },
  floralTopLeft: { position: 'absolute', top: '-20px', left: '-20px', fontSize: '180px', opacity: 0.15, transform: 'rotate(-30deg)', pointerEvents: 'none', zIndex: 0, filter: 'blur(1px)' },
  floralTopRight: { position: 'absolute', top: '-10px', right: '-20px', fontSize: '200px', opacity: 0.15, transform: 'rotate(20deg)', pointerEvents: 'none', zIndex: 0, filter: 'blur(1px)' },
  floralBottomLeft: { position: 'absolute', bottom: '-20px', left: '-10px', fontSize: '180px', opacity: 0.15, transform: 'rotate(30deg)', pointerEvents: 'none', zIndex: 0, filter: 'blur(1px)' },
  floralBottomRight: { position: 'absolute', bottom: '-20px', right: '-10px', fontSize: '200px', opacity: 0.15, transform: 'rotate(-20deg)', pointerEvents: 'none', zIndex: 0, filter: 'blur(1px)' },
  floralMiddleLeft: { position: 'absolute', top: '50%', left: '-30px', fontSize: '150px', opacity: 0.1, transform: 'translateY(-50%) rotate(15deg)', pointerEvents: 'none', zIndex: 0, filter: 'blur(1px)' },
  floralMiddleRight: { position: 'absolute', top: '50%', right: '-30px', fontSize: '150px', opacity: 0.1, transform: 'translateY(-50%) rotate(-15deg)', pointerEvents: 'none', zIndex: 0, filter: 'blur(1px)' },
  homeBtn: { position: 'absolute', top: '15px', left: '20px', zIndex: 1000, background: 'linear-gradient(to right, #EAB308, #D97706)', color: '#000000', padding: '10px 20px', borderRadius: '50px', fontFamily: "'Nunito', sans-serif", fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s ease', cursor: 'pointer' },
  container: { backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 14px 28px rgba(0,0,0,0.25)', position: 'relative', overflow: 'hidden', width: '768px', maxWidth: '100%', minHeight: '480px', zIndex: 1 },
  formContainer: { position: 'absolute', top: 0, height: '100%', transition: 'all 0.6s ease-in-out' },
  form: { backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 50px', height: '100%', textAlign: 'center' },
  signInContainer: { left: 0, width: '50%', zIndex: 2, transform: 'translateX(0)', opacity: 1 },
  signInContainerActive: { transform: 'translateX(100%)' },
  signUpContainer: { left: 0, width: '50%', opacity: 0, zIndex: 1, transform: 'translateX(0)' },
  signUpContainerActive: { transform: 'translateX(100%)', opacity: 1, zIndex: 5 },
  overlayContainer: { position: 'absolute', top: 0, left: '50%', width: '50%', height: '100%', overflow: 'hidden', transition: 'transform 0.6s ease-in-out', zIndex: 100, transform: 'translateX(0)' },
  overlayContainerActive: { transform: 'translateX(-100%)' },
  overlay: { background: 'linear-gradient(to right, #D4AF37, #F7EF8A)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', color: '#000000', position: 'relative', left: '-100%', height: '100%', width: '200%', transform: 'translateX(0)', transition: 'transform 0.6s ease-in-out' },
  overlayActive: { transform: 'translateX(50%)' },
  overlayPanel: { position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 40px', textAlign: 'center', top: 0, height: '100%', width: '50%', transition: 'transform 0.6s ease-in-out' },
  overlayLeft: { transform: 'translateX(-20%)' },
  overlayLeftActive: { transform: 'translateX(0)' },
  overlayRight: { right: 0, transform: 'translateX(0)' },
  overlayRightActive: { transform: 'translateX(20%)' },
  h1: { fontWeight: 'bold', margin: 0 },
  p: { fontSize: '14px', fontWeight: 100, lineHeight: '20px', letterSpacing: '0.5px', margin: '20px 0 30px' },
  span: { fontSize: '12px' },
  link: { color: '#333', fontSize: '14px', textDecoration: 'none', margin: '15px 0' },
  input: { backgroundColor: '#eee', border: 'none', padding: '12px 15px', margin: '8px 0', width: '100%' },
  button: { borderRadius: '20px', border: '1px solid #000000', backgroundColor: '#F7EF8A', color: '#000000', fontSize: '12px', fontWeight: 'bold', padding: '12px 45px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', marginTop: '8px' },
  ghostButton: { borderRadius: '20px', border: '1px solid #000000', backgroundColor: 'transparent', color: '#000000', fontSize: '12px', fontWeight: 'bold', padding: '12px 45px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' },
  socialContainer: { margin: '20px 0', display: 'flex', gap: '5px' },
  social: { border: '1px solid #DDDDDD', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', height: '40px', width: '40px', color: 'black', textDecoration: 'none' },
  socialText: { fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: '14px', letterSpacing: '2px', textDecoration: 'none', color: 'black', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center' },
};