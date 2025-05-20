from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

class Prompt(BaseModel):
    input: str

#method request post from the backend server
@app.post("/generate")
async def generate_text(prompt: Prompt):
    try:
        response = requests.post("http://localhost:11434/api/generate", json={
            "model": "tinyllama:1.1b-chat",
            "prompt": prompt.input,
            "stream": False,
            "options": {
                "temperature": 0.2,       # less creativity
                "top_p": 0.8,             # limits sampling scope
                "top_k": 40,              # narrow top-k tokens
                "repeat_penalty": 1.2     # penalizes repetition
            }
        })
        response.raise_for_status()
        return {"output": response.json()["response"]}
    except requests.exceptions.RequestException as e:
        return {"output": f"Error contacting model: {str(e)}"}
