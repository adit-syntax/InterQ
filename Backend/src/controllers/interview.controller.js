const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf, generateMoreQuestions } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        let resumeText = ""
        if (req.file) {
            console.log("📄 [Backend] Parsing uploaded resume PDF...")
            const resumeContent = await pdfParse(req.file.buffer)
            resumeText = resumeContent.text
        }

        const { selfDescription, jobDescription, questionCount } = req.body
        const customApiKey = req.headers["x-gemini-api-key"] || req.body.customApiKey

        const count = parseInt(questionCount) || 5

        console.log(`🤖 [Backend] Requesting Gemini AI to generate strategy & ${count} questions...`)

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription,
            questionCount: count,
            customApiKey
        })

        console.log("💾 [Backend] Saving generated interview report to MongoDB...")

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        console.log("✨ [Backend] Interview report generated successfully!")

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (error) {
        console.error("❌ [Backend] Error generating interview report:", error)
        res.status(500).json({
            message: error.message || "Failed to generate interview report. Please try again."
        })
    }
}

/**
 * @description Controller to refresh and generate additional questions for an interview report.
 */
async function generateMoreQuestionsController(req, res) {
    const { interviewId } = req.params
    const { count = 5, mode = "replace" } = req.body
    const customApiKey = req.headers["x-gemini-api-key"] || req.body.customApiKey

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, selfDescription, jobDescription } = interviewReport

    console.log(`🔄 [Backend] Generating ${count} new questions via Gemini AI...`)

    const newQuestions = await generateMoreQuestions({
        resume,
        selfDescription,
        jobDescription,
        count: parseInt(count) || 5,
        customApiKey
    })

    if (mode === "append") {
        interviewReport.technicalQuestions.push(...newQuestions.technicalQuestions)
        interviewReport.behavioralQuestions.push(...newQuestions.behavioralQuestions)
    } else {
        interviewReport.technicalQuestions = newQuestions.technicalQuestions
        interviewReport.behavioralQuestions = newQuestions.behavioralQuestions
    }

    await interviewReport.save()

    console.log("✅ [Backend] Questions refreshed & saved!")

    res.status(200).json({
        message: "Questions updated successfully.",
        interviewReport
    })
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController, generateMoreQuestionsController }