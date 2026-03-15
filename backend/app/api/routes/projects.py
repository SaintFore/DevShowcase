from app.models.project import Project, ProjectCreate, ProjectRead, ProjectUpdate
from app.models.user import User
from app.api.deps import get_current_user
from sqlmodel import Session, select
from fastapi import APIRouter, Depends, HTTPException
from app.database import get_session

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("/{project_id}", response_model=ProjectRead)
def get_project(
    project_id: int,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
):
    statement = select(Project).where(
        Project.owner_id == user.id, Project.id == project_id
    )
    project = session.exec(statement).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.get("/", response_model=list[ProjectRead])
def get_projects(
    session: Session = Depends(get_session), user: User = Depends(get_current_user)
):
    statement = select(Project).where(Project.owner_id == user.id)
    projects = session.exec(statement).all()
    return projects


@router.post("/", response_model=ProjectRead)
def create_project(
    project: ProjectCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
):
    db_project = Project(**project.model_dump(), owner_id=user.id)
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project


@router.patch("/{project_id}", response_model=ProjectRead)
def update_project(
    project: ProjectUpdate,
    project_id: int,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
):
    statement = select(Project).where(
        Project.owner_id == user.id, Project.id == project_id
    )
    db_project = session.exec(statement).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    project_data = project.model_dump(exclude_unset=True)
    for key, value in project_data.items():
        setattr(db_project, key, value)
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project


@router.delete("/{project_id}", status_code=204)
def delete_project(
    project_id: int,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
):
    statement = select(Project).where(
        Project.owner_id == user.id, Project.id == project_id
    )
    db_project = session.exec(statement).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    session.delete(db_project)
    session.commit()
    return
