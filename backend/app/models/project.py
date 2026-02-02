from typing import Optional
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON


class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    is_published: bool = False
    title: str
    description: Optional[str] = None
    tech_stack: list[str] = Field(default_factory=list, sa_column=Column(JSON))
    github_url: Optional[str] = None
