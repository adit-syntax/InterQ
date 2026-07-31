import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf, fetchMoreQuestions } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile, questionCount = 5 }) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile, questionCount })
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            const msg = error.response?.data?.message || error.message || "Failed to generate interview report."
            throw new Error(msg)
        } finally {
            setLoading(false)
        }
    }

    const refreshQuestions = async ({ count = 5, mode = "replace" }) => {
        const targetId = interviewId || report?._id
        if (!targetId) return null
        let response = null
        try {
            response = await fetchMoreQuestions({ interviewReportId: targetId, count, mode })
            if (response?.interviewReport) {
                setReport(response.interviewReport)
            }
        } catch (error) {
            console.log(error)
        }
        return response?.interviewReport
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response?.interviewReport
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response?.interviewReports
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

    return { loading, report, reports, generateReport, refreshQuestions, getReportById, getReports, getResumePdf }

}