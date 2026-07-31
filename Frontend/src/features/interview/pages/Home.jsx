import React, { useState, useRef, useEffect } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import Navbar from '../../../components/Navbar'

const LoadingOverlay = ({ selectedFile, questionCount }) => {
    const [ stage, setStage ] = useState(0)
    const [ progress, setProgress ] = useState(12)

    const stages = [
        { title: selectedFile ? `Parsing Resume (${selectedFile.name})` : "Parsing Candidate Profile Data", icon: "📄" },
        { title: "Analyzing Target Job Requirements", icon: "🎯" },
        { title: `Gemini AI Crafting ${questionCount} Custom Questions`, icon: "🤖" },
        { title: "Assessing Skill Gaps & Match Score", icon: "📊" },
        { title: "Building Day-by-Day Preparation Roadmap", icon: "🗓️" },
        { title: "Finalizing Strategy Studio", icon: "✨" }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 96) return 96
                return prev + Math.floor(Math.random() * 7) + 3
            })
        }, 550)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (progress > 82) setStage(5)
        else if (progress > 66) setStage(4)
        else if (progress > 48) setStage(3)
        else if (progress > 30) setStage(2)
        else if (progress > 14) setStage(1)
        else setStage(0)
    }, [ progress ])

    return (
        <main className='loading-screen'>
            <div className='loading-card'>
                <div className='brand-header'>
                    <img src='/logo.png' alt='InterQ Logo' className='app-logo' />
                    <span className='app-brand-name'>Inter<span className='highlight'>Q</span> AI Studio</span>
                </div>

                <h2>Building Your Interview Strategy...</h2>
                <p className='loading-sub'>AI analyzing candidate profile compatibility against target position requirements.</p>

                {/* Animated Percentage Gauge */}
                <div className='percentage-display'>
                    <span className='percentage-num'>{progress}%</span>
                    <span className='live-badge'>● LIVE AI PROCESSING</span>
                </div>

                {/* Smooth Progress Bar */}
                <div className='progress-bar-container'>
                    <div className='progress-bar-fill' style={{ width: `${progress}%` }} />
                </div>

                {/* Live Steps List */}
                <div className='loading-steps'>
                    {stages.map((s, idx) => (
                        <div key={idx} className={`step-item ${idx < stage ? 'completed' : idx === stage ? 'active' : 'pending'}`}>
                            <span className='step-icon'>{idx < stage ? '✓' : s.icon}</span>
                            <span className='step-title'>{s.title}</span>
                            {idx === stage && <span className='step-pulse' />}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ selectedFile, setSelectedFile ] = useState(null)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
        }
    }

    const handleRemoveFile = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setSelectedFile(null)
        if (resumeInputRef.current) {
            resumeInputRef.current.value = ""
        }
    }

    const [ questionCount, setQuestionCount ] = useState(5)
    const [ customApiKey, setCustomApiKey ] = useState(localStorage.getItem("interq_custom_api_key") || "")
    const [ errorMsg, setErrorMsg ] = useState("")

    const handleApiKeyChange = (e) => {
        const val = e.target.value.replace(/[^a-zA-Z0-9_\-]/g, "").trim()
        setCustomApiKey(val)
        if (val) {
            localStorage.setItem("interq_custom_api_key", val)
        } else {
            localStorage.removeItem("interq_custom_api_key")
        }
    }

    const clearApiKey = () => {
        setCustomApiKey("")
        localStorage.removeItem("interq_custom_api_key")
    }

    const [ isGenerating, setIsGenerating ] = useState(false)

    const handleGenerateReport = async () => {
        setErrorMsg("")
        setIsGenerating(true)
        const resumeFile = selectedFile || resumeInputRef.current?.files[0]
        try {
            const data = await generateReport({ jobDescription, selfDescription, resumeFile, questionCount })
            if (data?._id) {
                navigate(`/interview/${data._id}`)
            } else {
                setErrorMsg("Failed to generate report. Please try again.")
            }
        } catch (err) {
            let msg = err.message || "An error occurred while generating your interview plan."
            if (msg.includes("API key not valid") || msg.includes("API_KEY_INVALID")) {
                msg = "Invalid Gemini API key provided. Please clear the input to use the server key, or get a valid key from https://aistudio.google.com/app/apikey"
            }
            setErrorMsg(msg)
        } finally {
            setIsGenerating(false)
        }
    }

    if (isGenerating) {
        return <LoadingOverlay selectedFile={selectedFile} questionCount={questionCount} />
    }

    return (
        <div className='home-page'>
            <Navbar />

            {/* Page Header */}
            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            
                            {!selectedFile ? (
                                <label className='dropzone' htmlFor='resume'>
                                    <span className='dropzone__icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                    </span>
                                    <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
                                    <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
                                    <input ref={resumeInputRef} onChange={handleFileChange} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                                </label>
                            ) : (
                                <div className='uploaded-file-card'>
                                    <div className='file-info'>
                                        <span className='file-icon'>📄</span>
                                        <div className='file-details'>
                                            <p className='file-name'>{selectedFile.name}</p>
                                            <p className='file-size'>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for Analysis</p>
                                        </div>
                                        <button type='button' className='remove-file-btn' onClick={handleRemoveFile} title="Remove file">
                                            ✕
                                        </button>
                                    </div>
                                    <div className='resume-progress-bar'>
                                        <div className='resume-progress-fill' />
                                    </div>
                                    <span className='upload-status-text'>✓ Resume loaded &amp; ready</span>
                                </div>
                            )}
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                value={selfDescription}
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <div className='options-row' style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%', marginBottom: '1rem' }}>
                        <div className='question-count-selector'>
                            <label htmlFor='questionCountSelect'>Questions Count:</label>
                            <select
                                id='questionCountSelect'
                                value={questionCount}
                                onChange={(e) => setQuestionCount(Number(e.target.value))}
                                className='count-dropdown'
                            >
                                <option value={5}>5 Questions</option>
                                <option value={10}>10 Questions</option>
                                <option value={15}>15 Questions</option>
                                <option value={20}>20 Questions</option>
                                <option value={25}>25 Questions</option>
                            </select>
                        </div>

                        <div className='api-key-selector' style={{ flex: '1', minWidth: '220px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                                <label htmlFor='customApiKeyInput' style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                                    🔑 Custom Gemini API Key <span style={{ opacity: 0.7 }}>(Optional)</span>:
                                </label>
                                {customApiKey && (
                                    <button
                                        type='button'
                                        onClick={clearApiKey}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#ff2d78',
                                            fontSize: '0.75rem',
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                            padding: 0
                                        }}
                                    >
                                        ✕ Clear Key
                                    </button>
                                )}
                            </div>
                            <input
                                id='customApiKeyInput'
                                type='password'
                                value={customApiKey}
                                onChange={handleApiKeyChange}
                                placeholder='AIzaSy...'
                                style={{
                                    width: '100%',
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: '0.5rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    color: '#f8fafc',
                                    fontSize: '0.85rem'
                                }}
                            />
                        </div>
                    </div>

                    {errorMsg && <div className='error-banner' style={{ color: '#ff2d78', background: 'rgba(255, 45, 120, 0.1)', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid rgba(255, 45, 120, 0.3)', fontSize: '0.9rem' }}>{errorMsg}</div>}
                    <button
                        onClick={handleGenerateReport}
                        className='generate-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home