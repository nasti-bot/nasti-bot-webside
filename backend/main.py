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
    },
    {
        "id": 2,
        "title": "哥特回廊",
        "desc": "以哥特式尖拱与彩色玻璃为灵感的 AI 生成动画，营造神圣而幽邃的视觉叙事。",
        "tags": ["Stable Diffusion", "ComfyUI", "DaVinci Resolve"],
    },
    {
        "id": 3,
        "title": "玫瑰之窗",
        "desc": "向中世纪玫瑰花窗致敬的 AI 动画，几何放射与彩窗透光交织出神圣几何。",
        "tags": ["Runway Gen-3", "ComfyUI", "After Effects"],
    },
]

@app.get("/api/works")
def get_works():
    return works