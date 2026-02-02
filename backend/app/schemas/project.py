from typing import Optional
from pydantic import BaseModel, Field


class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    tech_stack: list[str] = Field(default_factory=list)
    github_url: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectRead(ProjectBase):
    id: int
    is_published: bool = False
