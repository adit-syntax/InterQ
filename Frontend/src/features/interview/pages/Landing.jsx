import React from 'react'
import { useNavigate } from 'react-router'
import '../style/landing.scss'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className='landing-page'>
            {/* ── Navigation Header ── */}
            <nav className='landing-nav'>
                <div className='landing-nav__brand' onClick={() => navigate('/')}>
                    <img src='/logo.png' alt='InterQ Logo' className='brand-logo' />
                    <span className='brand-name'>Inter<span className='highlight'>Q</span></span>
                </div>
                <div className='landing-nav__links'>
                    <a href='#features'>Features</a>
                    <a href='#how-it-works'>How It Works</a>
                    <button className='nav-login-btn' onClick={() => navigate('/login')}>Sign In</button>
                    <button className='nav-cta-btn' onClick={() => navigate('/register')}>Get Started Free</button>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <header className='landing-hero'>
                <div className='hero-badge'>
                    <span className='sparkle'>✨</span> Next-Gen AI Interview Coach
                </div>
                <h1>Master Any Job Interview with <span className='highlight'>AI Intelligence</span></h1>
                <p className='hero-subtitle'>
                    Upload your resume, paste the target job description, and get instant personalized technical questions, model answers, skill gap analysis, and tailored preparation plans.
                </p>
                <div className='hero-cta-group'>
                    <button className='btn-primary' onClick={() => navigate('/register')}>
                        Build My Strategy Free
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </button>
                    <button className='btn-secondary' onClick={() => navigate('/login')}>
                        Existing User? Sign In
                    </button>
                </div>

                {/* Hero App Mockup / Card Preview */}
                <div className='hero-preview-card'>
                    <div className='preview-header'>
                        <div className='preview-dots'>
                            <span className='dot red' />
                            <span className='dot yellow' />
                            <span className='dot green' />
                        </div>
                        <span className='preview-title'>InterQ Strategy Studio</span>
                    </div>
                    <div className='preview-body'>
                        <div className='preview-score-box'>
                            <div className='score-ring'>
                                <span>94%</span>
                            </div>
                            <div className='score-info'>
                                <h3>Senior Full Stack Developer</h3>
                                <p>Strong Match &bull; 10 Technical Qs &bull; 5 Behavioral Qs</p>
                            </div>
                        </div>
                        <div className='preview-sample-q'>
                            <div className='q-tag'>Sample Technical Question</div>
                            <p className='q-text'>"How would you design a distributed caching layer using Redis for high-throughput REST APIs?"</p>
                            <span className='a-reveal'>✓ Model Answer &amp; Interviewer Intention Included</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Features Section ── */}
            <section id='features' className='landing-features'>
                <div className='section-title'>
                    <h2>Everything You Need to <span className='highlight'>Land the Offer</span></h2>
                    <p>Powered by advanced Gemini AI algorithms tailored to real tech and industry standards.</p>
                </div>

                <div className='features-grid'>
                    <div className='feature-card'>
                        <div className='feature-icon'>🎯</div>
                        <h3>Match Score Analysis</h3>
                        <p>Get a real-time percentage score evaluating how closely your resume matches the target job requirements.</p>
                    </div>

                    <div className='feature-card'>
                        <div className='feature-icon'>🧠</div>
                        <h3>AI Question Generator</h3>
                        <p>Generate highly realistic technical and behavioral interview questions with interviewer intentions and model answers.</p>
                    </div>

                    <div className='feature-card'>
                        <div className='feature-icon'>🎛️</div>
                        <h3>Custom Question Count</h3>
                        <p>Choose 5, 10, 15, 20, or 25 questions per set, with one-click instant refresh for unlimited practice.</p>
                    </div>

                    <div className='feature-card'>
                        <div className='feature-icon'>🗺️</div>
                        <h3>Preparation Roadmap</h3>
                        <p>Receive a structured, day-by-day actionable study plan designed to fill identified skill gaps effectively.</p>
                    </div>

                    <div className='feature-card'>
                        <div className='feature-icon'>📄</div>
                        <h3>ATS-Optimized Resumes</h3>
                        <p>Generate and export tailored ATS-friendly PDF resumes customized specifically for the target job description.</p>
                    </div>

                    <div className='feature-card'>
                        <div className='feature-icon'>⚡</div>
                        <h3>Instant Real-Time Results</h3>
                        <p>Analysis completes in seconds with real-time progress indicators and intuitive step tracking.</p>
                    </div>
                </div>
            </section>

            {/* ── How It Works ── */}
            <section id='how-it-works' className='landing-steps'>
                <div className='section-title'>
                    <h2>How It Works in <span className='highlight'>3 Simple Steps</span></h2>
                </div>

                <div className='steps-container'>
                    <div className='step-item'>
                        <div className='step-number'>1</div>
                        <h3>Upload Profile</h3>
                        <p>Upload your PDF/DOCX resume or type a quick self-description of your skills and experience.</p>
                    </div>
                    <div className='step-arrow'>➔</div>
                    <div className='step-item'>
                        <div className='step-number'>2</div>
                        <h3>Target Job Description</h3>
                        <p>Paste the job description of the position you want to apply or interview for.</p>
                    </div>
                    <div className='step-arrow'>➔</div>
                    <div className='step-item'>
                        <div className='step-number'>3</div>
                        <h3>Ace the Interview</h3>
                        <p>Receive your custom strategy, practice questions, model answers, and preparation roadmap.</p>
                    </div>
                </div>
            </section>

            {/* ── Bottom CTA ── */}
            <section className='landing-cta-banner'>
                <h2>Ready to Win Your Next Interview?</h2>
                <p>Join candidates using InterQ to prepare smarter, practice faster, and land top offers.</p>
                <button className='btn-primary' onClick={() => navigate('/register')}>
                    Start Preparing Now — 100% Free
                </button>
            </section>

            {/* ── Footer ── */}
            <footer className='landing-footer'>
                <div className='footer-brand'>
                    <img src='/logo.png' alt='InterQ Logo' className='brand-logo' />
                    <span>InterQ &copy; {new Date().getFullYear()}</span>
                </div>
                <div className='footer-links'>
                    <a href='#features'>Features</a>
                    <a href='#how-it-works'>How It Works</a>
                    <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Sign In</a>
                    <a onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>Sign Up</a>
                </div>
            </footer>
        </div>
    )
}

export default Landing
