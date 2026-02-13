from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, JSON

if TYPE_CHECKING:
    from app.models.user import User


class ProjectBase(SQLModel):
    title: str
    description: Optional[str] = None
    tech_stack: list[str] = Field(default_factory=list)
    github_url: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectRead(ProjectBase):
    id: int
    is_published: bool


class ProjectUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tech_stack: Optional[list[str]] = None
    github_url: Optional[str] = None
    is_published: Optional[bool] = None


class Project(ProjectBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    is_published: bool = Field(default=False)
    tech_stack: list[str] = Field(
        default_factory=list, sa_column=Column(JSON, nullable=False)
    )

    owner_id: Optional[int] = Field(foreign_key="user.id")
    owner: Optional["User"] = Relationship(back_populates="projects")
