from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from contextlib import asynccontextmanager
from .schemas.project import ProjectCreate, ProjectRead
from .models.project import Project
from .database import get_session, create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/projects", response_model=list[ProjectRead])
def get_projects(session: Session = Depends(get_session)):
    statement = select(Project)
    projects = session.exec(statement).all()
    return projects


@app.post("/api/projects", response_model=ProjectRead)
def create_project(project: ProjectCreate, session: Session = Depends(get_session)):
    db_project = Project.model_validate(project)
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project
