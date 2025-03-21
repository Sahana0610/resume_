import openai

openai.api_key = "your-api-key"

def extract_job_requirements(job_description):
    prompt = f"Extract key skills, qualifications, and experience from this job description:\n{job_description}"
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return response['choices'][0]['message']['content']
