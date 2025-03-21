from fastapi import FastAPI, File, UploadFile, Form
from backend.backend.resume_parser import extract_resume_text
from job_analysis import extract_job_requirements
from backend.backend.recommendations import compare_resume_with_job, improve_resume
import shutil

app = FastAPI()

@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    resume_text = extract_resume_text(file_path)
    return {"resume_text": resume_text}

@app.post("/job-description")
async def job_description(description: str = Form(...)):
    requirements = extract_job_requirements(description)
    return {"requirements": requirements}

@app.post("/recommendations")
async def recommendations(resume: str = Form(...), job_description: str = Form(...)):
    comparison = compare_resume_with_job(resume, job_description)
    improvement = improve_resume(resume, job_description)
    return {"comparison": comparison, "improvement": improvement}
