from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET", "POST"],
)

profile = {
    "heroTitle": "关于我",
    "heroSubtitle": "项目，创意，灵感，心得，我的作品",
}

class AnalyzeRequest(BaseModel):
    text: str

@app.get("/api/profile")
def get_profile():
    return profile

@app.post("/api/analyze")
def analyze(req: AnalyzeRequest):
    return {
        "text": req.text,
        "score": 0.5,
        "label": "偏平静",
        "pinyin": "（模块 6 再说）",
    }

works = [
    {
        "id": 1,
        "title": "The Flowers of Abigail",
        "desc": "以花朵与人物交织的 AI 动画短片，探索自然与意识之间的诗意联结。",
        "tags": ["Stable Diffusion", "ControlNet", "Deforum", "After Effects"],
        "image": "作品/thumb-abigail.jpg",
    },
]

@app.get("/api/works")
def get_works():
    return works