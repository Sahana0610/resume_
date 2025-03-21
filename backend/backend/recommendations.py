# recommendations.py

import openai

openai.api_key = "your-api-key"

def compare_resume_with_job(resume_text, job_description):
    prompt = f"""
    Given this job description:
    {job_description}

    And this resume:
    {resume_text}

    Provide a detailed comparison. Specifically:
    1. **Key Strengths** (What aspects of the resume match the job description?)
    2. **Gaps/Weaknesses** (What is missing in the resume compared to the job description?)
    3. **Suggestions for Alignment** (What can be done to better match the resume to the job description?)
    4. **Overall Fit** (How well does the resume fit the job description?)

    Ensure the response is clear and useful for improving the resume's chances of passing ATS systems.
    """
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return response['choices'][0]['message']['content']

def improve_resume(resume_text, job_description):
    prompt = f"""
    Given this job description:
    {job_description}

    And this resume:
    {resume_text}

    Provide:
    1. **Missing Skills & Improvements** (What skills, keywords, or experiences should be added?)
    2. **Formatting Suggestions** (How can the resume be structured better?)
    3. **Achievements & Impact** (How can the experience be rewritten to highlight impact?)
    4. **Tailored Resume** (Rewrite the resume to match the job description)

    Ensure recommendations follow an ATS-friendly (Applicant Tracking System) format.
    """
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return response['choices'][0]['message']['content']
