from fastapi import APIRouter, Depends, HTTPException
from app.models.user import UserCreate, UserRead, User, UserUpdate
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError
from app.database import get_session
from app.core.security import hash_password

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/", response_model=list[UserRead])
def get_users(session: Session = Depends(get_session)):
    statement = select(User)
    users = session.exec(statement).all()
    return users


@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/", response_model=UserRead)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    hashed_password = hash_password(user.password)
    db_user = User(
        username=user.username, email=user.email, hashed_password=hashed_password
    )
    try:
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Username or email already exists")
    return db_user


@router.delete("/{user_id}", status_code=204)
def delete_user(user_id: int, session: Session = Depends(get_session)):
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(db_user)
    session.commit()


@router.patch("/{user_id}", response_model=UserRead)
def update_user(
    user: UserUpdate, user_id: int, session: Session = Depends(get_session)
):
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="未找到用户")
    user_data = user.model_dump(exclude_unset=True)

    if "password" in user_data:
        db_user.hashed_password = hash_password(user_data.pop("password"))

    for key, value in user_data.items():
        setattr(db_user, key, value)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user
