import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { X, Eye, EyeOff, Shield } from 'lucide-react';




// ── Password Guidelines component ──
function PasswordGuidelines({ password }: { password: string }) {
  const rules = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'At least one uppercase letter (A–Z)', ok: /[A-Z]/.test(password) },
    { label: 'At least one lowercase letter (a–z)', ok: /[a-z]/.test(password) },
    { label: 'At least one number (0–9)', ok: /\d/.test(password) },
    { label: 'At least one special character (!@#$%^&*)', ok: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];
  if (!password) return null;
  return (
    <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', marginTop: 6, width: '100%', textAlign: 'left' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#92400e', marginBottom: 6 }}>Password requirements:</p>
      {rules.map((r) => (
        <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 12, color: r.ok ? '#16a34a' : '#dc2626' }}>{r.ok ? '✓' : '✗'}</span>
          <span style={{ fontSize: 11, color: r.ok ? '#16a34a' : '#6b7280' }}>{r.label}</span>
        </div>
      ))}
    </div>
  );
}




// ── Forgot Password Modal ──
function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'email' | 'reset' | 'done'>('email');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState<'success' | 'error'>('error');
  const [loading, setLoading] = useState(false);




  const passwordValid = (p: string) =>
    p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && /[!@#$%^&*(),.?":{}|<>]/.test(p);




  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setMsgType('error'); setMsg('Please enter your email.'); return; }
    setLoading(true);
    try {
      const res = await fetch('http://localhost/paraiso-api/check_email.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.exists) {
        setMsg(''); setStep('reset');
      } else {
        setMsgType('error'); setMsg('No account found with that email.');
      }
    } catch {
      // Fallback: allow reset even if server unreachable (for dev)
      setMsg(''); setStep('reset');
    } finally {
      setLoading(false);
    }
  };




  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValid(newPassword)) { setMsgType('error'); setMsg('Password does not meet requirements.'); return; }
    if (newPassword !== confirmPassword) { setMsgType('error'); setMsg('Passwords do not match.'); return; }
    setLoading(true);
    try {
      const res = await fetch('http://localhost/paraiso-api/reset_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setStep('done');
      } else {
        setMsgType('error'); setMsg(data.message || 'Reset failed. Try again.');
      }
    } catch {
      setMsgType('error'); setMsg('Cannot connect to server. Make sure XAMPP is running.');
    } finally {
      setLoading(false);
    }
  };




  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 420, padding: 32, position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>




        {step === 'email' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, background: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Shield size={28} color="#d97706" />
              </div>
              <h2 style={{ fontWeight: 800, fontSize: 22, margin: 0 }}>Forgot Password?</h2>
              <p style={{ color: '#6b7280', fontSize: 13, marginTop: 6 }}>Enter your registered email to reset your password.</p>
            </div>
            {msg && <div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13 }}>{msg}</div>}
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="Enter your email address"
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, marginBottom: 16, boxSizing: 'border-box' }}
              />
              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '12px', background: 'linear-gradient(to right, #EAB308, #D97706)', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer', color: '#000' }}>
                {loading ? 'Checking...' : 'Continue'}
              </button>
            </form>
          </>
        )}




        {step === 'reset' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ fontWeight: 800, fontSize: 22, margin: 0 }}>Set New Password</h2>
              <p style={{ color: '#6b7280', fontSize: 13, marginTop: 6 }}>for <strong>{email}</strong></p>
            </div>
            {msg && <div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13 }}>{msg}</div>}
            <form onSubmit={handleReset}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>New Password</label>
              <div style={{ position: 'relative', marginBottom: 4 }}>
                <input
                  type={showNew ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} required
                  placeholder="Enter new password"
                  style={{ width: '100%', padding: '12px 40px 12px 14px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }}
                />
                <button type="button" onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordGuidelines password={newPassword} />




              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4, marginTop: 12 }}>Confirm Password</label>
              <div style={{ position: 'relative', marginBottom: 16 }}>
                <input
                  type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                  placeholder="Confirm new password"
                  style={{ width: '100%', padding: '12px 40px 12px 14px', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p style={{ fontSize: 12, color: '#dc2626', marginBottom: 12 }}>✗ Passwords do not match</p>
              )}
              {confirmPassword && newPassword === confirmPassword && (
                <p style={{ fontSize: 12, color: '#16a34a', marginBottom: 12 }}>✓ Passwords match</p>
              )}
              <button type="submit" disabled={loading || !passwordValid(newPassword) || newPassword !== confirmPassword}
                style={{ width: '100%', padding: '12px', background: (passwordValid(newPassword) && newPassword === confirmPassword) ? 'linear-gradient(to right, #EAB308, #D97706)' : '#e5e7eb', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: (passwordValid(newPassword) && newPassword === confirmPassword) ? 'pointer' : 'not-allowed', color: '#000' }}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </>
        )}




        {step === 'done' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontWeight: 800, fontSize: 22, margin: '0 0 8px' }}>Password Reset!</h2>
            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>Your password has been updated successfully. You can now sign in with your new password.</p>
            <button onClick={onClose}
              style={{ width: '100%', padding: '12px', background: 'linear-gradient(to right, #EAB308, #D97706)', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer', color: '#000' }}>
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}




export function Login() {
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [homeBtnHovered, setHomeBtnHovered] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);




  // Password strength validation
  const passwordValid = (p: string) =>
    p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && /[!@#$%^&*(),.?":{}|<>]/.test(p);




  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!passwordValid(signUpData.password)) {
      setMessageType('error');
      setMessage('Password must be at least 8 characters with uppercase, lowercase, number, and special character.');
      return;
    }
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
    } catch {
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
        // Store registration date for when they registered (new user flag)
        if (!localStorage.getItem('paraiso_registered_at')) {
          localStorage.setItem('paraiso_registered_at', new Date().toISOString());
        }
        setTimeout(() => {
          const params = new URLSearchParams(window.location.search);
          const from = params.get('from') || '/';
          navigate(from);
        }, 1500);
      } else {
        setMessageType('error');
        setMessage(result.message || 'Invalid email or password.');
      }
    } catch {
      setMessageType('error');
      setMessage('Cannot connect to server. Make sure XAMPP is running.');
    }
  };




  return (
    <div style={styles.body}>
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}




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
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9998,
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
            {/* Password with show/hide + guidelines */}
            <div style={{ position: 'relative', width: '100%', marginBottom: 2 }}>
              <input
                style={{ ...styles.input, marginBottom: 0, paddingRight: 40 }}
                type={showSignUpPassword ? 'text' : 'password'}
                placeholder="Password"
                value={signUpData.password}
                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                required
              />
              <button type="button" onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                {showSignUpPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <PasswordGuidelines password={signUpData.password} />
            <button style={{ ...styles.button, marginTop: 10 }} type="submit">Sign Up</button>
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
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                style={{ ...styles.input, paddingRight: 40 }}
                type={showSignInPassword ? 'text' : 'password'}
                placeholder="Password"
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                required
              />
              <button type="button" onClick={() => setShowSignInPassword(!showSignInPassword)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                {showSignInPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* FUNCTIONAL forgot password link */}
            <button type="button" onClick={() => setShowForgot(true)} style={{ ...styles.link, background: 'none', border: 'none', cursor: 'pointer' }}>
              Forgot your password?
            </button>
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
  container: { backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 14px 28px rgba(0,0,0,0.25)', position: 'relative', overflow: 'hidden', width: '768px', maxWidth: '100%', minHeight: '520px', zIndex: 1 },
  formContainer: { position: 'absolute', top: 0, height: '100%', transition: 'all 0.6s ease-in-out' },
  form: { backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 50px', height: '100%', textAlign: 'center', overflowY: 'auto' },
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
  input: { backgroundColor: '#eee', border: 'none', padding: '12px 15px', margin: '8px 0', width: '100%', boxSizing: 'border-box' as const },
  button: { borderRadius: '20px', border: '1px solid #000000', backgroundColor: '#F7EF8A', color: '#000000', fontSize: '12px', fontWeight: 'bold', padding: '12px 45px', letterSpacing: '1px', textTransform: 'uppercase' as const, cursor: 'pointer', marginTop: '8px' },
  ghostButton: { borderRadius: '20px', border: '1px solid #000000', backgroundColor: 'transparent', color: '#000000', fontSize: '12px', fontWeight: 'bold', padding: '12px 45px', letterSpacing: '1px', textTransform: 'uppercase' as const, cursor: 'pointer' },
  socialContainer: { margin: '20px 0', display: 'flex', gap: '5px' },
  social: { border: '1px solid #DDDDDD', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', height: '40px', width: '40px', color: 'black', textDecoration: 'none' },
  socialText: { fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: '14px', letterSpacing: '2px', textDecoration: 'none', color: 'black', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center' },
  containerActive: {},
};







